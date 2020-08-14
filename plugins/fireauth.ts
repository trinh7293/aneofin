import { auth } from '@/services/fireinit.ts'
import { Plugin } from '@nuxt/types'

const myPlugin: Plugin = (context) => {
    const { store } = context
    return new Promise(resolve => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const { email, displayName, uid } = user
                return resolve(store.commit('userState/setUser', 3))
                // return resolve(store.commit('userState/setUser', { email, displayName, uid }))
            }
            return resolve()
        })
    })
}

export default myPlugin
