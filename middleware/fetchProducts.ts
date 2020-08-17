import { Middleware } from '@nuxt/types'
import { getProducts } from '@/services/productsApi'

const middleware: Middleware = async () => {
  await getProducts()
}

export default middleware
