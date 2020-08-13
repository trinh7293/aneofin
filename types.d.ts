interface ItemStore {
  listItem: Array<ItemType>;
}

interface UserStateType {
  user: firebase.User | null;
}

interface ItemType {
  name: string
  cost: number;
}
