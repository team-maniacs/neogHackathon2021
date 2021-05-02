import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
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
    case "SHOW_MESSAGE_OPTIONS":
      return { ...state, showMessageOptions: !state.showMessageOptions };
    case "REPLY_TO_MESSAGE":
      return {
        ...state,
        replyToMessage: { id: action.value.id, flag: action.value.flag },
      };
    default:
      return state;
  }
};
const RoomProvider = ({ children }) => {
  const messageModal = useRef(null);
  const [roomState, roomDispatch] = useReducer(manageRooms, {
    rooms: [],
    searchRoomText: "",
    searchChatText: "",
    editMessage: { id: null, flag: false },
    replyToMessage: { id: null, flag: false },
    pinnedMessage: [],
    deleteMessage: null,
  });
  console.log(roomState);
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
    <RoomContext.Provider
      value={{ roomState, roomDispatch, filteredRooms, messageModal }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRooms = () => useContext(RoomContext);
export default RoomProvider;
