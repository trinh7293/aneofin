import {
  USER_COLLECTION,
  ORDER_SUBCOLLECTION,
  ORDER_DETAIL_SUBCOLLECTION
} from '@/constants'
import { firestore, auth } from '@/services/fireinit'
// import OrderConverter from '@/services/converters/OrderConverter'

const userDoc = () => {
  return firestore.collection(USER_COLLECTION)
    .doc(auth.currentUser?.uid)
}

const ordersCol = () => {
  return userDoc()
    .collection(ORDER_SUBCOLLECTION)
}

const orderDetailCol = () => {
  return userDoc()
    .collection(ORDER_DETAIL_SUBCOLLECTION)
}

export const getOrders = async () => {
  const snapshot = await ordersCol().get()
  if (snapshot.empty) {
    return
  }
  const listOrder: Array<ProductType> = []
  snapshot.forEach((doc) => {
    const { name, cost } = doc.data()
    listOrder.push({
      id: doc.id,
      name,
      cost
    })
  })
  return listOrder
}

// add order and orderDetail in batch
export const addPayingTransaction = async (
  listOrderDetail: Array<OrderDetailType>
) => {
  const batch = firestore.batch()
  const orderRef = ordersCol().doc()
  batch.set(orderRef, {
    createdDate: new Date()
  })
  listOrderDetail.forEach((odDe) => {
    const OrDeRef = orderDetailCol().doc()
    batch.set(OrDeRef, {
      orderId: orderRef.id,
      productId: odDe.productId,
      quantity: odDe.quantity
    })
  })
  await batch.commit()
  return orderRef.id
}
