import { Router } from "express";
import { getManagerProducts } from "../dao/daoManager.js";

const routerProducts = Router()

const managerData = await getManagerProducts()
const productManager = new managerData()


routerProducts.get('/', async (req, res) => {
    
    let { limit = 10, page = 1, category = undefined, stock = undefined, sort = undefined } = req.query;
    try {
        if (isNaN(page)) throw new Error("Parameter 'page' must be type: number")

        let filter = {}
        if (category) filter.category = category
        if (stock) filter.stock = { $gt: stock - 1 }

        const options = {
            page,
            limit,
            sort: sort && Object.keys(sort).length ? sort : undefined
        };

        if (sort != undefined) {
            if (sort.toLowerCase() != "asc" && sort.toLowerCase() != "desc") {
                throw new Error("Invalid sorting parameter")
            } else {
                sort.toLowerCase() == "asc" ? options.sort = "price" : options.sort = "-price"
            }
        }

        res.send({
            status: "success",
            payload: products.docs
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})


routerProducts.get('/:pid', async (req, res) => { 
    try {
        const product = await productManager.getElementById(req.params.pid)
        res.send({
            status: "success",
            payload: product
        });
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})
  
routerProducts.post('/', async (req, res) => {
    try {
        const info = req.body;
        let response = await productManager.addElements(info);
        res.send({
            status: "success",
            payload: response,
        });
    } catch (error) {
        res.send({
            status: "error",
            payload: error,
        });
    }
});

routerProducts.put('/:pid', async (req, res) => { 
    try {
        const product = await productManager.updateElement(req.params.pid, req.body)
        res.send({
            status: "success",
            payload: `Producto ${JSON.stringify(product)} actualizado.`
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })       
    }    
})
  
routerProducts.delete('/:pid', async (req, res) => {
    try {
        const product = await productManager.deleteElement(req.params.pid) 
        res.send({
            status: "success",
            payload: `Producto ${JSON.stringify(product)} eliminado.`
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
});


export default routerProducts;
