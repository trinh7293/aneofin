import { firestore, auth } from './fireinit'
import { USER_COLLECTION } from '~/constants'
import { buildUser } from '~/utils/transformData'

export const userJoin = async (
  email: string,
  password: string,
  displayName: string
) => {
  const data = await auth
    .createUserWithEmailAndPassword(email, password)
  const { user } = data
  await user?.updateProfile({
    displayName
  })
  if (user) {
    window.$nuxt.$store.commit('user/setUser', buildUser(user))
  }
  firestore.collection(USER_COLLECTION)
    .doc(auth.currentUser?.uid)
    .set({
      email,
      displayName
    })
}

export const userLogin = async (
  email: string,
  password: string
) => {
  await auth.signInWithEmailAndPassword(email, password)
}
