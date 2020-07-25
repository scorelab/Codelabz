import React, { useEffect, useState } from "react";
import { EditorUserIcons, EditorUserIconsExtra } from "./EditorUserIcons";
import { rearrangeUser } from "../../helpers/userListModifiers";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const UserList = ({ noteID }) => {
  const [mainUsers, setMainUsers] = useState(null);
  const [extraUsers, setExtraUsers] = useState(null);
  const firebase = useFirebase();
  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName },
      },
    }) => displayName
  );

  const photoURL = useSelector(
    ({
      firebase: {
        profile: { photoURL },
      },
    }) => photoURL
  );

  useEffect(() => {
    const ref = firebase
      .database()
      .ref()
      .child("notes")
      .child(noteID)
      .child("users");

    ref.on("value", (snap, _) => {
      if (snap.val()) {
        let { mainUsers, extraUsers } = rearrangeUser(
          Object.values(snap.val()),
          currentUserHandle
        );
        setMainUsers(mainUsers);
        setExtraUsers(extraUsers);
      }

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
    <>
      {mainUsers &&
        mainUsers.map((user, i) => {
          if (user.color) {
            return (
              <EditorUserIcons
                borderColor={user.color}
                text={user.displayName}
                image={user.photoURL}
                data={{ name: user.displayName, color: user.color }}
                key={`onlineUser_${i}`}
              />
            );
          }
          return null;
        })}
      {extraUsers && extraUsers.length > 0 && (
        <EditorUserIconsExtra data={extraUsers} />
      )}
    </>
  );
};

export default UserList;
