import React, { useEffect, useState } from "react";
import { useRooms } from "../room-context";
import "../styles/message.css";
import MessageEditModal from "./MessageEditModal";

const Message = ({
  id,
  message,
  timestamp,
  user,
  userImage,
  replyToMessage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { messageModal } = useRooms();
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (messageModal.current && !messageModal.current.contains(e.target))
        setShowModal(false);
    });
  });
  return (
    <div className="message-box">
      <img className="message-img" src={userImage} alt="" />

      <div
        id={id}
        className="message"

        // roomDispatch({ type: "SHOW_MESSAGE_OPTIONS" })}
        // onClick={()=>roomDispatch({type:"HIDE_MESSAGE_OPTIONS"})}
      >
        <div className="message-replay">
          {replyToMessage && (
            <p>
              {" "}
              @{replyToMessage.user} {replyToMessage.message}
            </p>
          )}
        </div>
        <div className="message-details">
          <div className="message-owner">{user}</div>
          <div className="message-timing">
            {new Date(timestamp?.toDate()).toUTCString()}
          </div>
        </div>
        <div
          className="message-text"
          onContextMenu={(e) => {
            setShowModal(true);
            e.preventDefault();
          }}
        >
          {message}
        </div>
        {showModal && <MessageEditModal id={id} />}
      </div>
    </div>
  );
};

export default Message;
