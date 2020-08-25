interface RootStateType {
}

interface ProductStateType {
  listProduct: Array<ProductType>
}

interface UserStateType {
  user: UserType | null
}

interface UserType {
  email: string | null
  displayName: string | null
  uid: string
}

interface ProductType {
  id: string
  name: string
  cost: number
}

interface OrderType {
  id: string
  createdDate: Date
}

interface OrderDetailType {
  id?: string
  name?: string
  cost?: number
  orderId?: string
  productId: string
  quantity: number
}
