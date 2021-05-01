import React from "react";
import "../styles/chat.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "../styles/talk.css";
import db from "../firebase";
import Message from "./Message";

const Talk = () => {
  const { roomId } = useParams();
  console.log(roomId);
  const [roomInfo, setRoomInfo] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snap) => setRoomInfo(snap.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snap) =>
        setRoomMessages(snap.docs.map((doc) => doc.data()))
      );
  }, [roomId]);
  console.log(roomInfo);
  console.log(roomMessages);

  return (
    <div className='chat-header'>
      <h1>Topic: {roomInfo?.name}</h1>

      <div className='message-section'>
        {roomMessages.map(({ message, user, timestamp, userImage }) => (
          <Message
            key={timestamp}
            message={message}
            user={user}
            timestamp={timestamp}
            userImage={userImage}
          />
        ))}
      </div>
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
