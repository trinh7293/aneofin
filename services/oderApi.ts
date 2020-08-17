import { ORDER_SUBCOLLECTION, USER_COLLECTION } from '@/constants'
import { firestore, auth } from '@/services/fireinit'
// import OrderConverter from '@/services/converters/OrderConverter'

const ordersCol = () => {
  return firestore.collection(USER_COLLECTION)
    .doc(auth.currentUser?.uid)
    .collection(ORDER_SUBCOLLECTION)
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

// TODO add order and orderDetail in transaction

// export const addOrder = async () => {
//   const order = await ordersCol()
//     .withConverter(OrderConverter).add({
//       createdDate: new Date()
//     })
//   return order.id
// }

// export const editProduct = async (
//   product: ProductType
// ) => {
//   const { name, cost } = product
//   const editData = {
//     name,
//     cost
//   }
//   await productsCol().withConverter(productConverter)
//     .doc(product.id).set(editData)
// }

// export const deleteProduct = (productId: string) => {
//   return productsCol().doc(productId).delete()
// }
