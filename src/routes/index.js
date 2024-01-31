import { Router } from "express"
import { productsRouter } from "./products.js"
import { cartsRouter } from "./carts.js"
import { chatRouter } from "./chat.js"
import { viewsRouter } from "./views.js"

const router = Router()
router.use('/', viewsRouter)
router.use('/products', productsRouter)
router.use('/carts', cartsRouter)
router.use('/chat', chatRouter)

export default router