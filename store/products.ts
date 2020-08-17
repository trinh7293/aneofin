export const state = () => ({
  listProduct: []
})

export const mutations = {
  addProduct (state: ProductStateType, product: ProductType) {
    const index = state.listProduct.findIndex(
      item => item.id === product.id
    )
    if (index < 0) {
      state.listProduct.push(product)
    }
  },
  setListProduct (state: ProductStateType, listProduct: Array<ProductType>) {
    state.listProduct = [...listProduct]
  }
}
