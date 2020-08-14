import { GetterTree } from 'vuex'
import { auth } from '@/services/fireinit'

export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state: UserStateType, user: UserType) {
    state.user = user
  }
}

export const getters: GetterTree<UserStateType, RootStateType> = {
  isAuthenticated: state => !!state.user
}
