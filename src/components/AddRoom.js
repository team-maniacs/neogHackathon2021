import React, { useState } from "react";
import db from "../firebase";

const AddRoom = () => {
  const [topic, setTopic] = useState("");

  const addRoom = () => {
    topic &&
      db.collection("rooms").add({
        name: topic,
      });
  };

  return (
    <div className="discussion-room new-room">
      <input
        className="new-room-input"
        type="text"
        placeholder="Enter room name"
        onChange={(e) => setTopic(e.target.value)}
      />
      <button className="room-join-btn" onClick={addRoom}>
        create room
      </button>
    </div>
  );
};

export default AddRoom;
