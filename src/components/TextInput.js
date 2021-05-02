import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuth } from "../context/user-context";
import db from "../firebase";
import firebase from "../firebase";
import "../styles/textinput.css";

const TextInput = ({ room, id }) => {
  const [input, setInput] = useState("");
  const { user } = useAuth();
  console.log(firebase.firestore);
  const sendMessage = (e) => {
    e.preventDefault();
    if (id) {
      db.collection("rooms").doc(id).collection("messages").add({
        message: input,
        timestamp: firebase.Xc.firebase_.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
  };

  return (
    <div className='input-box'>
      <form onSubmit={sendMessage}>
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
