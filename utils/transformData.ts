export const buildUser = (user: firebase.User): UserType => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  }
}
