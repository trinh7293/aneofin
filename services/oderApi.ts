import * as firebase from 'firebase/app'
import {
  USER_COLLECTION,
  ORDER_SUBCOLLECTION,
  ORDER_DETAIL_SUBCOLLECTION,
  PRODUCTS_SUBCOLLECTION
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

const productsCol = () => {
  return userDoc()
    .collection(PRODUCTS_SUBCOLLECTION)
}

export const getOrders = async () => {
  const snapshot = await ordersCol().get()
  if (snapshot.empty) {
    return
  }
  const listOrder: Array<ProductType> = []
  snapshot.forEach((doc) => {
    const { name, cost, stock } = doc.data()
    listOrder.push({
      id: doc.id,
      name,
      cost,
      stock
    })
  })
  return listOrder
}

// add order and orderDetail, decrease amount in store of products in batch
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
    const productRef = productsCol().doc(odDe.productId)
    batch.update(productRef, {
      stock: firebase.firestore.FieldValue.increment(-odDe.quantity)
    })
  })
  await batch.commit()
  return orderRef.id
}
