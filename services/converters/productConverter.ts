class Product {
    name: string

    cost: number

    constructor (
      name: string,
      cost: number
    ) {
      this.name = name
      this.cost = cost
    }
}

// Firestore data converter
export default {
  toFirestore (product: ProductType) {
    return {
      name: product.name,
      cost: product.cost
    }
  },
  fromFirestore (
    snapshot: firebase.firestore.DocumentSnapshot
  ) {
    const data = snapshot.data()
    return new Product(
        data?.name,
        data?.cost
    )
  }
}
