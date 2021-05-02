import React from "react";
import "../styles/chat.css";
import "../styles/talk.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import db from "../firebase";
import Message from "./Message";
import TextInput from "./TextInput";
import Header from "./Header";
import { useRooms } from "../room-context";
import { useRef } from "react";
import { useAuth } from "../context/user-context";
import RequestedUsers from "./RequestedUsers";
const Talk = () => {
  let messageRef = useRef(null);
  const { roomId } = useParams();
  const { user } = useAuth();
  const {
    roomState: { searchChatText },
  } = useRooms();
  const [roomInfo, setRoomInfo] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [requestedState, setRequestedState] = useState([]);
  const scrollToBottom = () => {
    const chat = messageRef;

    chat.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snap) => setRoomInfo(snap.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .onSnapshot(
        (snap) =>
          user.uid === snap.data().host &&
          db
            .collection("rooms")
            .doc(roomId)
            .collection("users")
            .onSnapshot((snapp) => {
              setRequestedState(snapp.docs);
            })
      );

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snap) =>
        setRoomMessages(
          snap.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
  }, [roomId, user]);
  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);
  const filteredChatMessages = roomMessages.filter(({ data: { message } }) =>
    message.toLowerCase().includes(searchChatText.toLowerCase())
  );
  console.log({ roomMessages, filteredChatMessages });
  return (
    <div className='app-content'>
      <Header page={"Chat"} />
      <h1 className='chat-header'>Topic: {roomInfo?.name}</h1>
      <div className='chat-section'>
        <div className='message-section' ref={(e) => (messageRef = e)}>
          {filteredChatMessages.map(
            ({
              id,
              data: { replyToMessage, message, user, timestamp, userImage },
            }) => (
              <Message
                roomid={roomId}
                id={id}
                key={id}
                message={message}
                user={user}
                timestamp={timestamp}
                userImage={userImage}
                replyToMessage={replyToMessage}
                chats={filteredChatMessages}
              />
            )
          )}
        </div>
        <RequestedUsers users={requestedState} roomId={roomId} />
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
