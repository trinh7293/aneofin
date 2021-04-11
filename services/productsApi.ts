// import _ from 'lodash'
import { PRODUCTS_SUBCOLLECTION, USER_COLLECTION } from '@/constants'
import { firestore, auth } from '@/services/fireinit'
import productConverter from '@/services/converters/productConverter'

const productsCol = () => {
  return firestore.collection(USER_COLLECTION)
    .doc(auth.currentUser?.uid)
    .collection(PRODUCTS_SUBCOLLECTION)
}

export const getProducts = async () => {
  const snapshot = await productsCol().get()
  if (snapshot.empty) {
    window.$nuxt.$toast.global.my_app_info({
      message: 'No product yet'
    })
    return
  }
  const listProduct: Array<ProductType> = []
  snapshot.forEach((doc) => {
    const { name, cost, stock } = doc.data()
    listProduct.push({
      id: doc.id,
      name,
      cost,
      stock: stock || 0
    })
  })
  return listProduct
}

export const addProduct = async (
  product: ProductType
) => {
  const { name, cost, stock } = product
  await productsCol()
    .withConverter(productConverter).add({
      name,
      cost: Number(cost),
      stock: Number(stock) || 0
    })
}

export const editProduct = (
  product: ProductType
) => {
  const { name, cost, stock } = product
  return productsCol().withConverter(productConverter)
    .doc(product.id).set({
      name,
      cost: Number(cost),
      stock: Number(stock) || 0
    })
}

export const deleteProduct = (productId: string) => {
  return productsCol().doc(productId).delete()
}

export const deleteBatchProduct = async (products: ProductType[]) => {
  const batch = firestore.batch()
  products.forEach((pro) => {
    const proRef = productsCol().doc(pro.id)
    batch.delete(proRef)
  })
  await batch.commit()
}
