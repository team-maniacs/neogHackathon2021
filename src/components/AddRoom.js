import React, { useState } from "react";
import db from "../firebase";
import { useRooms } from "../room-context";

const AddRoom = () => {
  const [topic, setTopic] = useState("");
  const { roomDispatch } = useRooms();
  const addRoom = () => {
    topic &&
      db.collection("rooms").add({
        name: topic,
      });
    roomDispatch({ type: "ADD_ROOM", value: topic });
    setTopic("");
  };

  return (
    <div className='new-room'>
      <label>Create Room</label>
      <input
        type='text'
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={addRoom}>+ create</button>
    </div>
  );
};

export default AddRoom;
