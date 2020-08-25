import _ from 'lodash'
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
    const { name, cost } = doc.data()
    listProduct.push({
      id: doc.id,
      name,
      cost
    })
  })
  return listProduct
}

export const addProduct = async (
  productData: ProductType
) => {
  const { name, cost } = productData
  await productsCol()
    .withConverter(productConverter).add({
      name,
      cost
    })
}

export const editProduct = (
  product: ProductType
) => {
  const editData = _.pick(product,
    'name',
    'cost'
  )
  return productsCol().withConverter(productConverter)
    .doc(product.id).set(editData)
}

export const deleteProduct = (productId: string) => {
  return productsCol().doc(productId).delete()
}
