import { useRooms } from "../room-context";

const MessageEditModal = ({ id }) => {
  const { messageModal, roomDispatch } = useRooms();
  return (
    <div className='message-edit' ref={messageModal}>
      <div>Edit Message</div>
      <div
        onClick={() =>
          roomDispatch({
            type: "REPLY_TO_MESSAGE",
            value: { id: id, flag: true },
          })
        }>
        Reply To
      </div>
      <div>Pin</div>
      <div>Delete Message</div>
    </div>
  );
};

export default MessageEditModal;
