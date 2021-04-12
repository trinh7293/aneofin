<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="8">
        <v-data-table
          :loading="loadingOrders"
          :search="searchOrder"
          :headers="headerOrders"
          :items="orders"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          @click:row="selectOrder"
        >
          <template v-slot:[`item.createdDate`]="{item}">
            {{ getTimeFormat(item) }}
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="4">
        <v-data-table
          v-if="selectedOrder"
          :loading="loadingDetails"
          :search="searchDetail"
          :headers="headerDetails"
          :items="details"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getTimeFormat } from '@/utils/dateTimeTransform'
import { getOrders, getDetailsFromOrder } from '@/services/oderApi'
@Component({
  layout: 'navigation'
})
export default class OrderHistory extends Vue {
  private loadingOrders: boolean = false
  private loadingDetails: boolean = false
  private searchOrder: string = ''
  private searchDetail: string = ''
  private sortBy: string = 'createdDate'
  private sortDesc: boolean = true
  private headerOrders = [
    { text: 'Thời gian', value: 'createdDate' },
    { text: 'Số tiền', value: 'totalValue' }
  ]

  private headerDetails = [
    { text: 'Tên', value: 'name' },
    { text: 'Đơn giá', value: 'cost' },
    { text: 'Số lượng', value: 'quantity' }
  ]

  private orders: OrderType[] = []
  private selectedOrder: OrderType | null = null
  private details: OrderDetailType[] = []

  async created () {
    await this.getOrders()
  }

  public getTimeFormat = (item: OrderType): string => {
    return getTimeFormat(item.createdDate)
  }

  public async getOrders () {
    this.loadingOrders = true
    this.orders = await getOrders()
    this.loadingOrders = false
  }

  public async selectOrder (order: OrderType) {
    this.selectedOrder = order
    this.loadingDetails = true
    this.details = await getDetailsFromOrder(order)
    this.loadingDetails = false
  }
}
</script>
