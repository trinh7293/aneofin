interface ItemStore {
  listItem: Array<ItemType>;
}

interface RootStateType {
}

interface UserStateType {
  user: firebase.UserInfo | null;
}

interface UserType {
  email: string;
  displayName: string;
  uid: number;
}

interface ItemType {
  name: string
  cost: number;
}
