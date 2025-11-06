import express from "express"
import {
    getCartItems,
    addCartItems,
    deleteCartItems,
    checkout
} from "../controllers/cart.controller.js"

const router = express.Router()

router.get("/", getCartItems)
router.post("/", addCartItems)
router.delete("/:id", deleteCartItems)
router.post("/checkout", checkout)

export default router
