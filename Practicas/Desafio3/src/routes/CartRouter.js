import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
const CartRouter = Router();

const cartManager = new CartManager();

CartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartManager.getProductFromCartId(cid);
        res.json(cart);
    } catch (error) {
        res.status(404).send("No se encontro el id y/o el producto. Intentelo nuevamente");
    }
});

CartRouter.post("/", async (req, res) => {
    const { body } = req

    try {
        const newCart = await cartManager.addCart(body);
        res.json(newCart);
    } catch (error) {
        res.status(400).send(error)
    }
});

CartRouter.post("/:cid/product/:pid", async (req, res) =>{
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const updateCart = await cartManager.addProductToCart(cid, pid, quantity);
        res.json(updateCart);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default CartRouter;
