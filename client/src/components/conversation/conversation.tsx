//import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface ConversationProps {
  conversation: {
    _id: string;
    members: string[]; 
  };
  currentUser: {
    _id: string;
  };
}

interface UserData {
  profilePicture: string;
  username: string;
}

const Conversation: React.FC<ConversationProps> = ({ conversation, currentUser }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const recipientId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`https://medinsights-8f8a.onrender.com/user?userId=${recipientId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationIMG" src={user?.profilePicture ? user.profilePicture : "./images/user.jpg"} alt="" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;