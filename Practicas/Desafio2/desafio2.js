const fs = require("fs").promises

class ProductManager {
    idAuto = 1;
    #products = [];
    path = ``

    constructor() {
        this.#products =[];
        this.path = `./products.json`
    }

    async getProducts() {
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            return JSON.parse(productFile);
        } catch (error) {
            await fs.writeFile(this.path, "[]");
            return "Archivo inexistente. Creando uno..."
        }
    }

    async addProducts(product) {
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let newProduct = JSON.parse(productFile);

            const valid = newProduct.find ((p) => p.id === product.id || p.code === product.code);

            if (valid) {
                throw new Error ("Id y/o code repetido. Intentarlo nuevamene")
            }

            if (newProduct.length > 0) {
                const lastProduct = newProduct[newProduct.length - 1];
                this.idAuto = lastProduct.id + 1;
            }

            newProduct.push({
                id: this.idAuto++,
                ...product,
            })

            await fs.writeFile(this.path, JSON.stringify(newProduct, null, 2));
            return "Objeto creado"
        } catch (error) {
            throw new Error (error)
        }
    }


    async getProductById(id) {
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let idProduct = JSON.parse(productFile);

            const searchProduct = idProduct.find((p) => p.id === id);

            if (!searchProduct) {
                throw new Error("No se encontro el producto. Intentelo nuevamente");
            }
            return searchProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, product) {
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(productFile);
    
            const idProduct = products.findIndex((p) => p.id === id);
    
            products.splice(idProduct, 1, { id, ...product });
    
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    
            return "el producto se modifico exitosamente";
        } catch (e) {
          throw new Error(e);
        }
    }

    async deleteProduct(id) {
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(productFile);
    
            const idProduct = products.find((p) => p.id === id);
    
            if (!idProduct) {
                throw new Error("EL ID NO EXISTE.");
            }
            
            const deletedProducts = products.filter((p) => p.id !== id);
    
            await fs.writeFile(this.path, JSON.stringify(deletedProducts, null, 2));
    
            return "El producto se elimino";
        } catch (e) {
          throw new Error(e);
        }
    }
}

const product1 = {
    title: "producto prueba",
    description: "este es un producto de prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25
}

const pm = new ProductManager();

const generate = async () => {
    //console.log(await pm.addProducts({...product1, code: "m3h"}));
    //console.log(await pm.getProducts());
}

//generate();

const main = async() => {
    //console.log("Lista de Productos: ", await pm.getProducts());
    //console.log("Resultado de Busqueda: ", await pm.getProductById(5));
    //console.log(await pm.updateProduct(5, {...product1, code:"meh v2.0"}));
    //console.log(await pm.deleteProduct(3));
}

main();