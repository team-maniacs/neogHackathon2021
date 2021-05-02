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
        setRoomMessages(
          snap.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
  }, [roomId]);
  console.log(roomInfo);
  console.log(roomMessages);

  const filteredChatMessages = roomMessages.filter(({ data: { message } }) =>
    message.toLowerCase().includes(searchChatText.toLowerCase())
  );

  return (
    <div className='app-content'>
      <Header page={"Chat"} />
      <div className='chat-header'>
        <h1>Topic: {roomInfo?.name}</h1>

        <div className='message-section'>
          {filteredChatMessages.map(
            ({
              id,
              data: { replyToMessage, message, user, timestamp, userImage },
            }) => (
              <Message
                id={id}
                key={timestamp}
                message={message}
                user={user}
                timestamp={timestamp}
                userImage={userImage}
                replyToMessage={replyToMessage}
              />
            )
          )}
        </div>
        {/* {flag && <ReplyToMessage chats={filteredChatMessages} />} */}
        <TextInput
          room={roomInfo?.name}
          id={roomId}
          chats={filteredChatMessages}
        />
      </div>
    </div>
  );
};

export default Talk;
