import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ store, route, redirect }) => {
  const unRequireAuths = ['login', 'join']
  console.log('store.getters[userState/isAuthenticated]', store.getters['userState/isAuthenticated'])
  console.log('route.name', route.name)
  if (
    !store.getters['userState/isAuthenticated']
    && route.name
    && !unRequireAuths.includes(route.name)
  ) {
    redirect('/login')
  }
  if (
    store.getters['userState/isAuthenticated']
    && route.name
    && unRequireAuths.includes(route.name)
  ) {
    redirect('/')
  }
}

export default myMiddleware
