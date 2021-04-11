class Product {
  name: string

  cost: number

  stock: number

  constructor (
    name: string,
    cost: number,
    stock: number
  ) {
    this.name = name
    this.cost = cost
    this.stock = stock
  }
}

// Firestore data converter
export default {
  toFirestore (product: ProductType) {
    return {
      name: product.name,
      cost: product.cost,
      stock: product.stock
    }
  },
  fromFirestore (
    snapshot: firebase.firestore.DocumentSnapshot
  ) {
    const data = snapshot.data()
    return new Product(
      data?.name,
      data?.cost,
      data?.stock
    )
  }
}
