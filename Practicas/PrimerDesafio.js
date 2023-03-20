const fs = require("fs")

class ProductManager {
    products = [];
    idAuto = 1;

    getProducts() {
        return this.products
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (this.products.find((p) => p.code === code)){
            throw Error("Codigo repetido")
        }
        const product = {
            id: this.idAuto++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        return product;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw Error ("Producto no encontrado o inexistente")
        }
        return product
    }
}

const productmanager = new ProductManager();

// console.log(productmanager.getProducts());
// Se prueba que devuelva el array vacio

const producto1 = productmanager.addProduct({
    title: "Espada de las mil verdades",
    description: "La espada mas imba de azeroth",
    price: 3000000,
    thumbnail: "Sin imagen (Nadie la ha visto en siglos)",
    code:"1mb4h4x0r",
    stock: 1
})

const producto2 = productmanager.addProduct({
    title: "Ghal Maraz",
    description: "Mazo usado por el mismisimo Sigmar",
    price: 5000000,
    thumbnail: "Sin imagen (Secreto del imperio)",
    code:"HolySigmar",
    stock: 1
})

const producto3 = productmanager.addProduct({
    title: "Grudge-Raker",
    description: "Arma de fuego forjada por enanos",
    price: 200,
    thumbnail: "Sin imagen",
    code:"Kazhalid",
    stock: 385
})

console.log(productmanager.getProducts());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// Evaluar code repetido e Id existente ////////////////////////////////////////////////////////////////////////////////////////

/* try {
    productmanager.addProduct({
        title: "Grudge-Raker",
        description: "Arma de fuego forjada por enanos",
        price: 200,
        thumbnail: "Sin imagen",
        code:"1mb4h4x0r",
        stock: 385
    })
} catch (err) {
    console.error(err.message);
}

try {
    productmanager.getProductById(9);
} catch (err) {
    console.error(err.message);
}

const productById = productmanager.getProductById(2);
console.log(productById) */