import React, { useState } from "react";
import { useAuth } from "../context/user-context";
import db from "../firebase";
import { useRooms } from "../room-context";

const AddRoom = () => {
  const [topic, setTopic] = useState("");
  const { user } = useAuth();
  const { roomDispatch } = useRooms();

  const addRoom = async () => {
    roomDispatch({
      type: "ADD_ROOM",
      value: { name: topic, host: user.uid },
    });
    const data = await db.collection("rooms").add({
      name: topic,
      host: user.uid,
    });
    db.collection("rooms")
      .doc(data.id)
      .collection("users")
      .add({ userId: user.uid, isEditable: true, isRequested: false });
    db.collection("users").doc(user.uid).collection("rooms").add({
      roomname: topic,
      host: true,
      admin: true,
    });

    setTopic("");
  };

  return (
    <div className='discussion-room new-room'>
      <label>Create Room</label>
      <input
        className='new-room-input'
        type='text'
        placeholder='Enter room name'
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        className='room-join-btn'
        onClick={addRoom}
        disabled={topic ? false : true}>
        create room
      </button>
    </div>
  );
};

export default AddRoom;
