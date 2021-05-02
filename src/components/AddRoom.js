import React, { useState } from "react";
import { useAuth } from "../context/user-context";
import db from "../firebase";
import { useRooms } from "../room-context";

const AddRoom = () => {
  const [topic, setTopic] = useState("");
  const { user } = useAuth();
  const { roomDispatch } = useRooms();
  console.log({ user });

  const addRoom = async () => {
    if (topic) {
      roomDispatch({
        type: "ADD_ROOM",
        value: { name: topic, host: user.uid },
      });
      const data = await db.collection("rooms").add({
        name: topic,
        host: user.uid,
      });
      console.log({ id: data.id });
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
    }
  };

  return (
    <div className='new-room'>
      <label>Create Room</label>
      <input type='text' onChange={(e) => setTopic(e.target.value)} />
      <button onClick={addRoom}>+ create</button>
    </div>
  );
};

export default AddRoom;
