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

export const actions = {
  async login (payload: {
    email: string,
    password: string
  }) {
    const { email, password } = payload
    await auth.signInWithEmailAndPassword(email, password)
    // commit('setUser', userCre.user)
  },

  async userJoin (payload: {
    email: string,
    password: string,
    displayName: string,
  }) {
    const { email, password, displayName } = payload
    const data = await auth
      .createUserWithEmailAndPassword(email, password)
    const { user } = data
    await user?.updateProfile({
      displayName
    })
    // commit('setUser', user)
    // TODO add user doc to firestore
    // await userDoc().withConverter(userConverter).set({
    //   email,
    //   displayName,
    // })
  }
}
