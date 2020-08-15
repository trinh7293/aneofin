<template>
  <v-app>
    <main>
      <v-main>
        <Nuxt />
      </v-main>
      <v-bottom-navigation
        dark
        grow
        app
        :value="currentTab"
        color="teal"
      >
        <v-btn
          v-for="tab in tabs"
          :key="tab.title"
          :value="tab"
          @click="changeRoute(tab.path)"
        >
          <!-- @click="currentTab = tab" -->
          <span>{{ tab.title }}</span>
          <v-icon>{{ tab.icon }}</v-icon>
        </v-btn>
        <v-btn
          @click="logoutDialog = true"
        >
          <span>Log out</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <confirm-dialog
        v-model="logoutDialog"
        title="Logout"
        comment="Signout from aneofin"
        @confirm="submitSignout"
      />
    </main>
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { auth } from '~/services/fireinit'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

@Component({
  components: {
    ConfirmDialog
  }
})
export default class Navigation extends Vue {
  private tabs = [
    {
      title: 'Bán hàng',
      icon: 'mdi-home',
      path: '/'
    },
    {
      title: 'Quản lý mặt hàng',
      icon: 'mdi-star',
      path: '/items/edit'
    },
    {
      title: 'Kho',
      icon: 'mdi-chart-bar',
      path: '/'
    }
  ]

  private currentTab = this.tabs[0]

  private logoutDialog = false

  public changeRoute (path: string) {
    this.$router.push(path)
  }

  public async submitSignout () {
    try {
      await auth.signOut()
      this.$store.commit('user/setUser', null)
      this.$router.push('/login')
    } catch (error) {
      this.$toasted.global.my_app_error(error)
    }
  }
}
</script>
