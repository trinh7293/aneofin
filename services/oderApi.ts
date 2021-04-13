import * as firebase from 'firebase/app'
import {
  USER_COLLECTION,
  ORDER_SUBCOLLECTION,
  ORDER_DETAIL_SUBCOLLECTION,
  PRODUCTS_SUBCOLLECTION,
  ORDER_ID
} from '@/constants'
import { firestore, auth } from '@/services/fireinit'
import { getTimeFormat } from '@/utils/dateTimeTransform'

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

export const getOrders = async (): Promise<OrderType[]> => {
  const snapshot = await ordersCol()
    .orderBy('createdDate', 'desc')
    .get()
  if (snapshot.empty) {
    return []
  }
  const listOrder: Array<OrderType> = []
  snapshot.forEach((doc) => {
    const { createdDate, totalValue } = doc.data()
    listOrder.push({
      id: doc.id,
      createdDate: createdDate.toDate(),
      createdDateFormat: getTimeFormat(createdDate.toDate()),
      totalValue
    })
  })
  return listOrder
}

export const getDetailsFromOrder = async (order: OrderType)
: Promise<OrderDetailType[]> => {
  const orderId = order.id
  const snapshot = await orderDetailCol().where(ORDER_ID, '==', orderId).get()
  if (snapshot.empty) {
    return []
  }
  const listDetails: OrderDetailType[] = []
  snapshot.forEach((doc) => {
    const { name, cost, orderId, productId, quantity } = doc.data()
    listDetails.push({
      id: doc.id,
      name,
      cost,
      orderId,
      productId,
      quantity
    })
  })
  return listDetails
}

// add order and orderDetail, decrease amount in store of products in batch
export const addPayingTransaction = async (
  listOrderDetail: Array<OrderDetailType>,
  totalValue: number
) => {
  const batch = firestore.batch()
  const orderRef = ordersCol().doc()
  const createdDate = new Date()
  batch.set(orderRef, {
    createdDate,
    totalValue
  })
  listOrderDetail.forEach((odDe) => {
    const OrDeRef = orderDetailCol().doc()
    const { productId, quantity, name, cost } = odDe
    batch.set(OrDeRef, {
      orderId: orderRef.id,
      createdDate,
      productId,
      quantity,
      name,
      cost
    })
    const productRef = productsCol().doc(odDe.productId)
    batch.update(productRef, {
      stock: firebase.firestore.FieldValue.increment(-odDe.quantity)
    })
  })
  await batch.commit()
  return orderRef.id
}
