import React from "react";
import "../styles/chat.css";
import "../styles/talk.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/talk.css";
import db from "../firebase";
import Message from "./Message";
import TextInput from "./TextInput";
import Header from "./Header";
import { useRooms } from "../room-context";

const Talk = () => {
  const { roomId } = useParams();
  console.log(roomId);
  const {
    roomState: { searchChatText },
  } = useRooms();
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

  const filteredChatMessages = roomMessages.filter(({ message }) =>
    message.toLowerCase().includes(searchChatText.toLowerCase())
  );
  return (
    <div className='app-content'>
      <Header page={"Chat"} />
      <div className='chat-header'>
        <h1>Topic: {roomInfo?.name}</h1>

        <div className='message-section'>
          {filteredChatMessages.map(
            ({ message, user, timestamp, userImage }) => (
              <Message
                key={timestamp}
                message={message}
                user={user}
                timestamp={timestamp}
                userImage={userImage}
              />
            )
          )}
        </div>

        <TextInput room={roomInfo?.name} id={roomId} />
      </div>
    </div>
  );
};

export default Talk;
