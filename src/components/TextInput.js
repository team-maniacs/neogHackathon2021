import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuth } from "../context/user-context";
import db from "../firebase";
import firebase from "../firebase";
import { useRooms } from "../room-context";
import "../styles/textinput.css";
import ReplyToMessage from "./ReplyToMessage";

const TextInput = ({ room, id, chats }) => {
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const {
    roomState: {
      replyToMessage: { flag, id: replyId },
    },
    roomDispatch,
  } = useRooms();

  const chat = chats.find(({ id: chatId }) => chatId === replyId);

  const sendMessage = (e) => {
    e.preventDefault();
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .add({
          replyToMessage: flag
            ? {
                user: chat?.data.user,
                message: chat?.data.message,
              }
            : null,
          message: input,
          timestamp: firebase.Xc.firebase_.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImage: user.photoURL,
        });
      setInput("");
      if (flag) {
        roomDispatch({ type: "REPLY_TO_MESSAGE", value: { flag: false } });
      }
    }
  };

  return (
    <div className='input-box'>
      <form onSubmit={sendMessage}>
        {flag && <ReplyToMessage chats={chats} />}
        <input
          className='input-message'
          value={input}
          placeholder={`Send in ${room}`}
          onChange={(e) => setInput(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className='send-icon'
          disabled={input ? false : true}
          onClick={(e) => sendMessage(e)}
        />
      </form>
    </div>
  );
};

export default TextInput;
