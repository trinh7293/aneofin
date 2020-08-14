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
          @click="submitSignout"
        >
          <span>Log out</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </main>
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { auth } from '~/services/fireinit'

const tabs = [
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

export default Vue.extend({
  data: () => ({
    tabs,
    currentTab: tabs[0]
  }),
  methods: {
    ...mapMutations({
      setUser: 'user/setUser'
    }),
    changeRoute (path: string) {
      this.$router.push(path)
    },
    async submitSignout () {
      try {
        await auth.signOut()
        this.setUser(null)
        this.$router.push('/login')
      } catch (error) {
        this.$toasted.global.my_app_error(error)
      }
    }
  }
})
</script>
