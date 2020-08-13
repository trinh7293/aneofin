import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { auth } from '@/services/fireinit'

export const state = () => ({
  user: null
})
  
export const mutations = {
  setUser (state: UserStateType, user : firebase.User | null) {
    state.user = user
  }
}
  
export const actions: ActionTree<UserStateType, UserStateType> = {
  async login ({commit}, payload: {
    email: string,
    pass: string
  }) {
    const { email, pass } = payload
    const userCre = await auth.signInWithEmailAndPassword(email, pass)
    commit('setUser', userCre.user)
  }
}

export const getters: GetterTree<UserStateType, UserStateType> = {
  isAuthenticated: state => !!state.user
}