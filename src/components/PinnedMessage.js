import { useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "../firebase";
import Message from "./Message";

const PinnedMessage = () => {
  const { roomId } = useParams();
  const [pinnedMsg, showPinnedMsg] = useState([]);
  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .collection("pinnedMessages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snap) => {
        showPinnedMsg(
          snap.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  });
  return (
    <div>
      {pinnedMsg.map(
        ({
          id,
          data: { replyToMessage, message, user, timestamp, userImage },
        }) => (
          <div key={id}>
            <Message
              roomid={roomId}
              id={id}
              key={id}
              message={message}
              user={user}
              timestamp={timestamp}
              userImage={userImage}
              replyToMessage={replyToMessage}
              chats={pinnedMsg}
            />
          </div>
        )
      )}
    </div>
  );
};
export default PinnedMessage;
