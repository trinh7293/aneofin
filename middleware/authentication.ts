import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ store, route, redirect }) => {
  console.log('store.getters', store.getters['user/isAuthenticated'])
    if (!store.getters['user/isAuthenticated'] && route.name !== 'login') {
      redirect('/login')
    }
    if (store.getters['user/isAuthenticated'] && route.name === 'login') {
      redirect('/')
    }
  }
  
export default myMiddleware
