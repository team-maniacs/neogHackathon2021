import db from "../firebase";
import { useRooms } from "../room-context";

const MessageEditModal = ({ roomid, id, chats }) => {
  const { roomDispatch } = useRooms();
  const {
    data: { message, user, userImage, timestamp },
  } = chats.find(({ id: chatId }) => chatId === id);
  console.log(chats);

  const deleteMessage = async () => {
    try {
      await db
        .collection("rooms")
        .doc(roomid)
        .collection("messages")
        .doc(id)
        .delete();
    } catch (error) {
      console.log("Error in deleting ", error.message);
    }
  };
  const savePinnedMessage = () => {
    db.collection("rooms").doc(roomid).collection("pinnedMessages").add({
      message: message,
      timestamp: timestamp,
      user: user,
      userImage: userImage,
    });
  };
  return (
    <div className='message-edit'>
      <div
        onClick={() =>
          roomDispatch({ type: "EDIT_MESSAGE", value: { id: id, flag: true } })
        }>
        Edit Message
      </div>
      <div
        onClick={() =>
          roomDispatch({
            type: "REPLY_TO_MESSAGE",
            value: { id: id, flag: true },
          })
        }>
        Reply To
      </div>
      <div onClick={() => savePinnedMessage({ id })}>Pin</div>
      <div onClick={() => deleteMessage({ id })}>Delete Message</div>
    </div>
  );
};

export default MessageEditModal;
