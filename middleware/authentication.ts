import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ store, route, redirect }) => {
  const unRequireAuths = ['login', 'join']
  if (
    !store.getters['user/isAuthenticated'] &&
    route.name &&
    !unRequireAuths.includes(route.name)
  ) {
    redirect('/login')
  }
  if (
    store.getters['user/isAuthenticated'] &&
    route.name &&
    unRequireAuths.includes(route.name)
  ) {
    redirect('/')
  }
}

export default myMiddleware
