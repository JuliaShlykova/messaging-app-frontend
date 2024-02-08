const updatedUsers = (users, loggedUsers, getUser) => {
  let newUsers = [...users];
  let lgUsers = [...loggedUsers];
  for (let i=0;i<users.length;i++) {
    if (users[i].nickname===getUser().nickname) continue;
    let onlineIndex = lgUsers.findIndex(x => x.nickname===users[i].nickname);
    if (onlineIndex>-1) {
      if (!users[i].online) {
        newUsers[i].online=true;
      }
      lgUsers.splice(onlineIndex,1);
    } else {
      if (users[i].online) {
        delete newUsers[i].online;
      }
    }
  }
  if (lgUsers.length>1) {
    lgUsers.forEach(lgUser => {
      if (lgUser.nickname!==getUser().nickname) {
      newUsers.push({...lgUser, online: true});
    }
    })
  }
  return newUsers;
}

export default updatedUsers;