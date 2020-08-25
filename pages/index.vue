<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="8"
      >
        <v-data-table
          :loading="loading"
          :headers="headersProductList"
          :items="products"
          @click:row="addProductToCart"
        />
      </v-col>
      <v-col
        cols="4"
      >
        <v-data-table
          hide-default-footer
          hide-default-header
          :headers="headersListOrderDetail"
          :items="listOrderDetail"
          @click:row="removeOrderDetail"
        >
          <template slot="body.append">
            <tr>
              <td />
              <td>Total: {{ totalCost }}</td>
              <td />
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getProducts } from '@/services/productsApi'

@Component({
  layout: 'navigation'
})
export default class Order extends Vue {
  private products: Array<ProductType> = []
  private loading: boolean = false

  private headersProductList = [
    { text: 'Name', value: 'name' },
    { text: 'Cost', value: 'cost' }
  ]

  private headersListOrderDetail = [
    { text: 'Name', value: 'name' },
    { text: 'Quantity', value: 'quantity' }
  ]

  private listOrderDetail: Array<OrderDetailType> = []

  public start () {
    this.loading = true
  }

  public stop () {
    this.loading = false
  }

  public async getProductData () {
    this.start()
    const listProduct = await getProducts() || []
    this.stop()
    this.products = listProduct
  }

  async created () {
    await this.getProductData()
  }

  public addProductToCart (item: ProductType) {
    const checkProduct = this.listOrderDetail.find(
      product => product.productId === item.id
    )
    if (!checkProduct) {
      this.listOrderDetail.push({
        productId: item.id,
        quantity: 1,
        name: item.name,
        cost: item.cost
      })
    } else {
      checkProduct.quantity++
    }
  }

  public removeOrderDetail (orDe: OrderDetailType) {
    const index = this.listOrderDetail.findIndex(
      item => item.productId === orDe.productId
    )
    if (index >= 0) {
      this.listOrderDetail.splice(index, 1)
    }
  }

  get totalCost () {
    let total = 0
    this.listOrderDetail.forEach((item) => {
      const itemToCost: number = item.cost ? (item.quantity * item.cost) : 0
      total += itemToCost
    })
    return total
  }
}
</script>
