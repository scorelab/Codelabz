import React, { useEffect, useState } from "react";
import { EditorUserIcons, EditorUserIconsExtra } from "./EditorUserIcons";
import { rearrangeUser } from "../../helpers/userListModifiers";

const UserList = ({
  firebase,
  noteID,
  currentUserHandle,
  displayName,
  photoURL,
}) => {
  const [mainUsers, setMainUsers] = useState(null);
  const [extraUsers, setExtraUsers] = useState(null);

  useEffect(() => {
    const ref = firebase
      .database()
      .ref()
      .child("notes")
      .child(noteID)
      .child("users");

    ref.on("value", (snap, _) => {
      let { mainUsers, extraUsers } = rearrangeUser(
        Object.values(snap.val()),
        currentUserHandle
      );
      setMainUsers(mainUsers);
      setExtraUsers(extraUsers);

      // This is nested intentionally
      ref.child(currentUserHandle).update({
        displayName: displayName,
        photoURL: photoURL,
        handle: currentUserHandle,
      });
    });

    ref.child(currentUserHandle).onDisconnect().remove();

    return () => {
      ref.off("value");
      ref.child(currentUserHandle).remove();
    };
  }, [noteID, firebase, photoURL, displayName, currentUserHandle]);
  return (
    <div>
      {mainUsers &&
        mainUsers.map((user, i) => {
          return (
            <EditorUserIcons
              borderColor={user.color}
              text={user.displayName}
              image={user.photoURL}
              data={{ name: user.displayName, color: user.color }}
              key={user.handle + i}
            />
          );
        })}
      {extraUsers && extraUsers.length > 0 && (
        <EditorUserIconsExtra data={extraUsers} />
      )}
    </div>
  );
};

export default UserList;
