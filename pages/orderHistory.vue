<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="8">
        <v-toolbar
          flat
        >
          <v-toolbar-title>Lịch sử hóa đơn</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-text-field
            v-model="searchOrder"
            append-icon="mdi-magnify"
            label="Tìm kiếm"
            single-line
            hide-details
          />
        </v-toolbar>
        <v-data-table
          :loading="loadingOrders"
          :search="searchOrder"
          :headers="headerOrders"
          :items="orders"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          single-select
        >
          <template v-slot:item="{item}">
            <tr
              :class="{ 'active-order-class': isSelected(item) }"
              dark
              @click="selectOrder(item)"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.createdDateFormat }}</td>
              <td>{{ item.totalValue }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="4">
        <template v-if="selectedOrder">
          <v-toolbar
            flat
          >
            <v-toolbar-title>Chi tiết</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-text-field
              v-model="searchDetail"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
              single-line
              hide-details
            />
          </v-toolbar>
          <v-data-table
            :loading="loadingDetails"
            :search="searchDetail"
            :headers="headerDetails"
            :items="details"
          />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
    { text: 'ID', value: 'id' },
    { text: 'Thời gian', value: 'createdDateFormat' },
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
    await this.selectFirstOrder()
  }

  public async selectFirstOrder () {
    if (this.orders.length > 0) {
      await this.selectOrder(this.orders[0])
    }
  }

  public isSelected (item: OrderType): boolean {
    if (this.selectedOrder) {
      return item.id === this.selectedOrder.id
    }
    return false
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

<style>
  .active-order-class{
    background-color: #e4edf8;
    color: #1767c0;
  }
</style>
