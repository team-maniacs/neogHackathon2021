import { faHandPaper, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/user-context";
import db from "../firebase";
import firebase from "../firebase";
import { useRooms } from "../room-context";
import "../styles/textinput.css";
import ReplyToMessage from "./ReplyToMessage";

const TextInput = ({ room, id, chats }) => {
  const [input, setInput] = useState("");
  const [editRights, setEditRights] = useState(true);
  const { user } = useAuth();
  const {
    roomState: {
      rooms,
      replyToMessage: { flag: replyFlag, id: replyId },
      editMessage: { flag: editFlag, id: editId },
    },
    roomDispatch,
  } = useRooms();
  console.log({ rooms });
  const chat = chats.find(({ id: chatId }) => chatId === replyId);
  const editChat = chats.find(({ id: chatId }) => chatId === editId);
  console.log({ editChat });
  useEffect(() => {
    if (editFlag) {
      setInput(editChat.data.message);
    }
  }, [editFlag, editChat]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (id) {
      if (!editFlag) {
        db.collection("rooms")
          .doc(id)
          .collection("messages")
          .add({
            replyToMessage: replyFlag
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
      } else {
        db.collection("rooms")
          .doc(id)
          .collection("messages")
          .doc(editId)
          .update({
            message: input,
          });
        roomDispatch({ type: "EDIT_MESSAGE", value: { flag: false } });
      }
      setInput("");
      if (replyFlag) {
        roomDispatch({ type: "REPLY_TO_MESSAGE", value: { flag: false } });
      }
    }
  };
  const getEditAccess = () => {
    db.collection("rooms").doc(id).collection("users").add({
      userId: user.uid,
      userName: user.displayName,
      isRequested: true,
      isEditable: false,
    });
  };

  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .collection("users")
      .onSnapshot((snap) => {
        snap.docs.find(
          (doc) =>
            doc.data().userId === user.uid &&
            setEditRights(!doc.data().isEditable)
        );
      });
  }, [editRights, setEditRights, rooms, user, id]);
  return (
    <div className='input-box'>
      <form onSubmit={sendMessage}>
        {replyFlag && <ReplyToMessage chats={chats} />}
        <input
          className='input-message'
          value={input}
          placeholder={`Send in ${room}`}
          onChange={(e) => setInput(e.target.value)}
          disabled={editRights}
        />
        {!editRights ? (
          <FontAwesomeIcon
            icon={faPaperPlane}
            className='send-icon'
            disabled={input ? false : true}
            onClick={(e) => sendMessage(e)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHandPaper}
            className='raise-hand-icon'
            onClick={() => getEditAccess()}
          />
        )}
      </form>
    </div>
  );
};

export default TextInput;
