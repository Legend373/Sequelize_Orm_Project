import express from "express";
import {
    getUserCart,
    addToCart,
    removeFromCart,
    clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getUserCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.delete("/clear/:userId", clearCart);

export default router;
