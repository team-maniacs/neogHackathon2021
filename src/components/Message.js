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
    <div className='message'>
      <img src={userImage} alt='' style={{ height: "50px", width: "50px" }} />

      <div
        id={id}
        className='message-info'

        // roomDispatch({ type: "SHOW_MESSAGE_OPTIONS" })}
        // onClick={()=>roomDispatch({type:"HIDE_MESSAGE_OPTIONS"})}
      >
        <div>
          {replyToMessage && (
            <p>
              {" "}
              @{replyToMessage.user} {replyToMessage.message}
            </p>
          )}
        </div>
        <h4
          onContextMenu={(e) => {
            setShowModal(true);
            e.preventDefault();
          }}>
          {message}
        </h4>
        <p>
          {user} {new Date(timestamp?.toDate()).toUTCString()}
        </p>
        {showModal && <MessageEditModal id={id} />}
      </div>
    </div>
  );
};

export default Message;
