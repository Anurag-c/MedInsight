import React from "react";
//import "./message.css";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import dayjs, { Dayjs } from "dayjs";
dayjs.extend(localizedFormat);
dayjs.extend(utc);
// import { format } from "timeago.js";
interface MessageProps {
  message: {
    text: string;
    createdAt: string; // Assuming createdAt is a string, update the type accordingly
  };
  own: boolean;
}

const Message: React.FC<MessageProps> = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageIMG" src="./images/user.jpg" alt="" />
        <p className="messageText">{message.text}</p>
      </div>

      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
      <div className="messageBottom">{dayjs(message.createdAt).utc().format('YYYY-MM-DD HH:mm:ss')}</div>
      
    </div>
  );
};

export default Message;