interface ItemStore {
  listItem: Array<ItemType>;
}

interface RootStateType {
}

interface UserStateType {
  user: UserType | null;
}

interface UserType {
  email: string | null;
  displayName: string | null;
  uid: string;
}

interface ItemType {
  name: string
  cost: number;
}
