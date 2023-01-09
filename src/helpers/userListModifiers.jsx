export const rearrangeUser = (userList, currentUser) => {
  let mainUsers = [];

  userList.forEach((user) => {
    if (user.handle === currentUser) {
      mainUsers.unshift(user);
    } else {
      mainUsers.push(user);
    }
  });

  let extraUsers = mainUsers.splice(5);

  return { mainUsers, extraUsers };
};
