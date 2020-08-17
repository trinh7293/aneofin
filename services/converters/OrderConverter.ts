class Order {
  createdDate: Date
  constructor (
    createdDate: Date
  ) {
    this.createdDate = createdDate
  }
}

// Firestore data converter
export default {
  toFirestore (order: OrderType) {
    return {
      createdDate: order.createdDate
    }
  },
  fromFirestore (
    snapshot: firebase.firestore.DocumentSnapshot
  ) {
    const data = snapshot.data()
    return new Order(
        data?.createdDate
    )
  }
}
