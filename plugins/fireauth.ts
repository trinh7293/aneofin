import { auth } from '@/services/fireinit.ts'
import { Plugin } from '@nuxt/types'

const myPlugin: Plugin = (context) => {
    const { store } = context
    return new Promise(resolve => {
        auth.onAuthStateChanged(user => {
        if (user) {
            return resolve(store.commit('setUser', user))
        }
        return resolve()
        })
    })
}
  
export default myPlugin
