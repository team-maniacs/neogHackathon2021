import React from "react";
import { useNavigate } from "react-router";
import { useRooms } from "../room-context";
import "../styles/chaupal.css";
import AddRoom from "./AddRoom";

const SidebarRooms = () => {
  const { filteredRooms } = useRooms();
  const navigate = useNavigate();

  const selectRoom = (id) => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate(`title`);
    }
  };

  return (
    <div className="room-box">
      {filteredRooms.map((room) => (
        <div className="discussion-room" key={room.id}>
          <div className="room-header">
            <div className="room-img">
              <img src=""></img>
            </div>
            <div className="room-info">
              <h2>{room.name}</h2>
              <div className="room-time">{room.name}</div>
            </div>
          </div>
          <button className="room-join-btn" onClick={() => selectRoom(room.id)}>
            Enter Room
          </button>
        </div>
      ))}

      {<AddRoom />}
    </div>
  );
};

export default SidebarRooms;
