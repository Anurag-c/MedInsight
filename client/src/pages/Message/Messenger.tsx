import React, { useState, useEffect, useRef, useContext } from "react";
import {Typography, Divider, Box, Button, Card, TextField, IconButton} from '@mui/material';
import AuthContext from "../../contexts/AuthContext";
import { socket, connectSocket } from '../../socket';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from "react-router-dom";
import { useThemeContext } from "../../contexts/ThemeContext";

function Messenger() {
  const auth = useContext(AuthContext);
  const token = auth?.authState?.token;
  const user = auth?.authState.user.token ? auth.authState.user.user : auth?.authState.user;
  const location = useLocation();
  const theme = useThemeContext();
  const primary = theme.currentTheme.palette.primary;
  const [conversations, setConversations] = useState<{}[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [receiver, setReceiver] = useState<any>(null);
  const [messages, setMessages] = useState<{}[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (!socket) {
      connectSocket(token);
    }
  }, []); 

  useEffect(() => {
    socket?.emit('get_direct_conversations', { user_id: user?.id }, (data: any) => {
      setConversations(data);
    });
  }, [socket]);

  useEffect(() => {
    if (location?.state?.userId) {
      socket?.emit('start_conversation', location.state.userId, (data: any) => {
      })
    }
  }, [location?.state?.userId])

  useEffect(() => {
    socket?.on('start_chat', (data: any) => {
      socket?.emit('get_direct_conversations', { user_id: user?.id }, (data: any) => {
        setConversations(data);
        data.length && data?.map((item: any) => {
          if (item.participants.find((attr: any) => attr._id === location?.state?.userId)) {
            setSelectedConversation(item);
            getAllMessages(item);
          }
        })
      });
    })
  }, [socket]);

  useEffect(() => {
    socket?.on('new_message', (data: any) => {
      selectedConversation && getAllMessages(selectedConversation);
    });
  }, [socket])

  const getAllMessages = (conversation: any) => {
    const receiver = conversation.participants.find((item: any) => item._id !== user?.id);
    setSelectedConversation(conversation);
    setReceiver(receiver);
    socket?.emit('get_messages', { conversation_id: conversation._id }, (data: any) => {
      setMessages(data);
    })
  }

  const handleSendMessage = () => {
    const payload = {
      message: newMessage,
      conversation_id: selectedConversation?._id,
      from: user?.id,
      to: receiver._id
    }
    socket?.emit('text_message', payload, (data: any) => {
    })
    socket?.on('new_message', (data: any) => {
      getAllMessages(selectedConversation)
    });
    setNewMessage('');
  }

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
      <Box height={'100%'} flex={0.3} borderRight={1} borderColor={'lightgray'} paddingRight={2}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} borderBottom={1} borderColor={'lightgray'} pb={1}>
          <Typography variant="h6">Messages</Typography>
        </Box>
        {!conversations.length ? <Typography mt={3} textAlign={'center'} color={'gray'} variant="body2" fontWeight={600}>You have no open conversations</Typography> : (
          <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}>
            {
              conversations.map((item: any) => (
                <Card key={item._id} elevation={0} variant="outlined" sx={{ cursor: 'pointer', p: 2, bgcolor: item._id === selectedConversation?._id ? 'lightgray' : 'white' }} onClick={() => getAllMessages(item)}>
                  <Typography>{item.participants.find((person: any) => person._id !== user?.id)?.name}</Typography>
                </Card>
              ))
            }
          </Box>
        )}
      </Box>
      <Box width={'100%'} height={'100%'} flex={0.7} display={'flex'} alignItems={'center'} justifyContent={'center'} paddingLeft={2}>
        { !selectedConversation ? <Typography variant="h6" color="primary">Please select a chat to continue</Typography> : 
          (
            <Box width={'100%'} height={'100%'} display={'flex'} flexDirection={'column'}>
              <Box flex={1} display={'flex'} flexDirection={'column'} gap={2}>
                {
                  messages.length ? messages.map((message: any) => (
                    <Card key={message._id} elevation={0} sx={{ paddingX: 3, paddingY: 1, bgcolor: message.from === user?.id ? 'lightgray' : primary.main, maxWidth: 350, alignSelf: message.from === user?.id ? 'flex-end' : 'flex-start' }}>
                      <Typography variant="body2" color={message.from === user?.id ? 'black' : 'white'}>{message.text}</Typography>
                    </Card>
                  )) : (
                    <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                      <Typography variant="body1">No messages</Typography>
                    </Box>
                  )
                }
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <TextField 
                  size="small" 
                  fullWidth
                  name="newMessage"
                  id="newMessage"
                  placeholder="Start typing to send a message"
                  value={newMessage ?? ''} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                />
                <IconButton disabled={!newMessage} size="small" color="primary" onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          )
        }
      </Box>
    </Box>
  );
}
export default Messenger;
              
