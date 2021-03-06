import { Plugin } from '@nuxt/types'
import { auth } from '@/services/fireinit.ts'
import { buildUser } from '@/utils/transformData'

const myPlugin: Plugin = (context) => {
  const { store } = context
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        store.commit('user/setUser', buildUser(user))
        return resolve()
      }
      return resolve()
    })
  })
}

export default myPlugin
