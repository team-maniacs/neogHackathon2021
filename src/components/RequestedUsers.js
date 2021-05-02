import db from "../firebase";
const RequestedUsers = ({ users, roomId }) => {
  console.log({ users });

  const giveAccess = ({ id, name, userId }) => {
    db.collection("rooms").doc(roomId).collection("users").doc(id).update({
      isRequested: false,
      isEditable: true,
      userName: name,
      userId: userId,
    });
  };
  const rejectAccess = ({ id, name, userId }) => {
    db.collection("rooms").doc(roomId).collection("users").doc(id).update({
      isRequested: false,
      isEditable: false,
      userName: name,
      userId: userId,
      status: "rejected",
    });
  };
  return (
    <div className='req-user'>
      {users?.map((user) => {
        return (
          user.data().isRequested && (
            <div>
              <p>{user.data().userName}</p>
              <p>{roomId}</p>
              <button
                onClick={() =>
                  giveAccess({
                    id: user.id,
                    name: user.data().userName,
                    userId: user.data().userId,
                  })
                }>
                Give Access
              </button>
              <button
                onClick={() =>
                  rejectAccess({
                    id: user.id,
                    name: user.data().userName,
                    userId: user.data().userId,
                  })
                }>
                Reject
              </button>
            </div>
          )
        );
      })}
    </div>
  );
};

export default RequestedUsers;
