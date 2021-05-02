import { useRooms } from "../room-context";

const ReplyToMessage = ({ chats }) => {
  const {
    roomState: {
      replyToMessage: { id },
    },
  } = useRooms();
  const chat = chats.find(({ id: chatId }) => chatId === id);

  return (
    <div className='reply_to_message'>
      <p>
        @{chat.data.user} {chat.data.message}
      </p>
    </div>
  );
};

export default ReplyToMessage;
