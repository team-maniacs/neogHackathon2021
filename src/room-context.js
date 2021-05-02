import { createContext, useContext, useEffect, useReducer } from "react";
import db from "./firebase";
const RoomContext = createContext();
export const manageRooms = (state, action) => {
  switch (action.type) {
    case "SET_ROOMS":
      return { ...state, rooms: action.value };
    case "ADD_ROOM":
      return { ...state, rooms: [...state.rooms, action.value] };
    case "SEARCH_ROOM_TEXT":
      return { ...state, searchRoomText: action.value };
    case "SEARCH_CHAT_TEXT":
      return { ...state, searchChatText: action.value };
    default:
      return state;
  }
};
const RoomProvider = ({ children }) => {
  const [roomState, roomDispatch] = useReducer(manageRooms, {
    rooms: [],
    searchRoomText: "",
    searchChatText: "",
  });

  useEffect(() => {
    db.collection("rooms").onSnapshot((snap) =>
      roomDispatch({
        type: "SET_ROOMS",
        value: snap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        })),
      })
    );
  }, [roomDispatch]);

  const filteredRooms = roomState.rooms.filter((room) =>
    room.name.toLowerCase().includes(roomState.searchRoomText.toLowerCase())
  );

  return (
    <RoomContext.Provider value={{ roomState, roomDispatch, filteredRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRooms = () => useContext(RoomContext);
export default RoomProvider;
