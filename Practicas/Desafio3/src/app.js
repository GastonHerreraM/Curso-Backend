import express from "express"

import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Bienvenidos: dirijase a /products para proseguir con el desafio. Gracias");
});

app.get("/products", async (req, res) => {
    const limit = +req.query.limit;
    const products = await productManager.getProducts();
    let filteredproduct = limit ? products.slice(0, limit) : products;
    res.send(filteredproduct);
});

app.get("/products/:id", async (req, res) => {
    const productId = +req.params.id;
    const products = await productManager.getProducts();
    const filteredproduct = products.find(p => p.id === productId);
    if (!filteredproduct) {
        res.status(404).send("No se encontro ningun producto bajo ese ID. Intentelo nuevamente");
    } else {
        res.send(filteredproduct);
    }
});

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080")
});