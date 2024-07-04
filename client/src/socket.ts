import { io } from 'socket.io-client';

const { REACT_APP_API_URL } = process.env;
let socket: any;

const connectSocket = (token: any) => {
    socket = io(`${REACT_APP_API_URL}`, { query: {
        token: token
    }})
}

export { socket, connectSocket };