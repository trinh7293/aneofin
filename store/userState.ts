import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { auth } from '@/services/fireinit'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state: UserStateType, user: firebase.User | null) {
    state.user = user
  }
}

export const getters: GetterTree<UserStateType, RootStateType> = {
  isAuthenticated: state => !!state.user
}

export const actions: ActionTree<UserStateType, RootStateType> = {
  async login({ commit }, payload: {
    email: string,
    password: string
  }) {
    const { email, password } = payload
    console.log('email', email)
    console.log('pass', password)
    const userCre = await auth.signInWithEmailAndPassword(email, password)
    // commit('setUser', userCre.user)
  },

  async userJoin({ commit }, payload: {
    email: string,
    password: string,
    displayName: string,
  }) {
    const { email, password, displayName } = payload
    const data = await auth
      .createUserWithEmailAndPassword(email, password)
    const { user } = data
    await user?.updateProfile({
      displayName,
    })
    // commit('setUser', user)
    // TODO add user doc to firestore
    // await userDoc().withConverter(userConverter).set({
    //   email,
    //   displayName,
    // })
  }
}
