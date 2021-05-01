import React from "react";
import "../styles/chat.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Talk = () => {
  const { roomId } = useParams();
  console.log(roomId);

  return (
    <div className='chat-header'>
      <h1>my room {roomId}</h1>

      <div></div>
      <div className='input-box'>
        <input
          className='input-message'
          type='text'
          placeholder='Enter your message'
        />
        <FontAwesomeIcon icon={faPaperPlane} className='send-icon' />
      </div>
    </div>
  );
};

export default Talk;
