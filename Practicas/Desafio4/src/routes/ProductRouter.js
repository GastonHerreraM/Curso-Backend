import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
const ProductRouter = Router();

const productManager = new ProductManager();

ProductRouter.get("/", async (req, res) => {
    const limit = +req.query.limit;
    const products = await productManager.getProducts();
    let filteredproduct = limit ? products.slice(0, limit) : products;
    res.send(filteredproduct);
});

ProductRouter.get("/:pid", async (req, res) => {
    const id = +req.params.pid;
    const products = await productManager.getProductById(id);
    if (!products) {
        res.status(404).send("No se encontro ningun producto bajo ese ID. Intentelo nuevamente");
    } else {
        res.send(products);
    }
});

ProductRouter.post("/", async (req, res) => {
    const product = req.body;

    try {
        await productManager.addProducts(product);
        res.send("Producto agregado exitosamente");
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

ProductRouter.put("/:pid", async (req, res) => {
    const id= +req.params.pid;
    const product = req.body;

    try {
        await productManager.updateProduct(id, product);
        res.send ("producto actualizado exitosamente");
    } catch (error) {
        res.status(404).send("producto no encontrado");        
    }
});

ProductRouter.delete('/:pid', async (req, res) => {
    const id = +req.params.pid;
  
    try {
        await productManager.deleteProduct(id);
        res.send("Producto eliminado exitosamente");
    } catch (error) {
        res.status(404).send("Producto no encontrado");
    }
});

export default ProductRouter;
