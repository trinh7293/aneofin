<template>
  <v-container class="grey lighten-5">
    <!-- <v-card>
      <v-card-title>
        Bán hàng
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Tìm kiếm"
          single-line
          hide-details
        />
      </v-card-title>
    </v-card> -->
    <v-toolbar
      flat
    >
      <v-toolbar-title>Bán hàng</v-toolbar-title>
      <v-divider
        class="mx-4"
        inset
        vertical
      />
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Tìm kiếm"
        single-line
        hide-details
      />
    </v-toolbar>
    <v-row no-gutters>
      <v-col
        cols="8"
      >
        <v-data-table
          :loading="loading"
          :search="search"
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
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="red"
              small
              @click="removeOrderDetail(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:[`item.quantity`]="props">
            <v-edit-dialog
              :return-value.sync="props.item.quantity"
            >
              {{ props.item.quantity }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.quantity"
                  :rules="quantityRules"
                  label="Edit"
                  single-line
                />
              </template>
            </v-edit-dialog>
          </template>
          <template slot="body.append">
            <tr>
              <td>Tổng: {{ totalValue }}</td>
              <td />
            </tr>
          </template>
        </v-data-table>
        <v-btn
          color="primary"
          :disabled="listOrderDetail.length < 1"
          :loading="payLoading"
          @click="addPayingTransactionImpl"
        >
          Thanh toán
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import _ from 'lodash'
import { getProducts } from '@/services/productsApi'
import { addPayingTransaction } from '@/services/oderApi'
import { quantityRules } from '@/utils/validateRules'

@Component({
  layout: 'navigation'
})
export default class Order extends Vue {
  private products: Array<ProductType> = []
  private loading: boolean = false
  private payLoading: boolean = false
  private quantityRules: Array<any> = quantityRules
  private search: string = ''
  private headersProductList = [
    { text: 'Tên', value: 'name' },
    { text: 'Giá', value: 'cost' }
  ]

  private headersListOrderDetail = [
    { text: 'Tên', value: 'name' },
    { text: 'Số lượng', value: 'quantity' },
    { text: '', value: 'actions', sortable: false }
  ]

  private listOrderDetail: Array<OrderDetailType> = []

  public async addPayingTransactionImpl () {
    if (this.payLoading) {
      return
    }
    try {
      this.payLoading = true
      const orderId = await addPayingTransaction(
        this.listOrderDetail, this.totalValue
      )
      this.$toast.global.my_app_success({
        message: `Successfully Pay for Order ID ${orderId}`
      })
      this.listOrderDetail.splice(0, this.listOrderDetail.length)
    } catch (error) {
      this.$toast.global.my_app_error(error)
    }
    this.payLoading = false
  }

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

  get totalValue () {
    return _.sumBy(this.listOrderDetail, i => (i.cost || 0) * i.quantity)
  }
}
</script>
