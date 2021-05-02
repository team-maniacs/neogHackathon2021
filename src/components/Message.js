import React, { useEffect, useRef, useState } from "react";

import "../styles/message.css";
import MessageEditModal from "./MessageEditModal";

const Message = ({
  id,
  message,
  timestamp,
  user,
  userImage,
  replyToMessage,
  chats,
  roomid,
}) => {
  const [showModal, setShowModal] = useState(false);

  const messageRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      setShowModal(false);
    });
    console.log(messageRef.current);
    document.addEventListener("contextMenu", (e) => {
      // if (messageRef.current && !messageRef.current.contains(e.target))
      setShowModal(false);
    });
  });
  return (
    <div className='message-box'>
      <img className='message-img' src={userImage} alt='' />

      <div id={id} className='message'>
        <div className='message-replay'>
          {replyToMessage && (
            <p>
              {" "}
              @{replyToMessage.user} {replyToMessage.message}
            </p>
          )}
        </div>
        <div className='message-details'>
          <div className='message-owner'>{user}</div>
          <div className='message-timing'>
            {new Date(timestamp?.toDate()).toUTCString()}
          </div>
        </div>
        <div
          ref={messageRef}
          className='message-text'
          onContextMenu={(e) => {
            setShowModal(true);
            e.preventDefault();
          }}>
          {message}
        </div>
        {showModal && (
          <MessageEditModal id={id} chats={chats} roomid={roomid} />
        )}
      </div>
    </div>
  );
};

export default Message;
