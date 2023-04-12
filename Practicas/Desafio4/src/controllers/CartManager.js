import fs from "fs/promises";

class CartManager {
    idAuto = 1;
    #cart = [];
    path = ``;

    constructor() {
        this.#cart = [];
        this.path = `./db/cart.json`;
    }

    async getCart() {
        try {
            const cartFile = await fs.readFile(this.path, "utf-8");
            return JSON.parse(cartFile);
        } catch (error) {
            throw new Error;
        }
    };

    async addCart(items) {
        try {
            const arrCarts = await this.getCart();
            const addCart = [...arrCarts, {
                    id: this.idAuto++,
                    products: items,
                }
            ]

            await fs.writeFile(this.path, JSON.stringify(addCart, null, 2));
            return "Cart creado";
        } catch (error) {
            throw new Error(error);
        }
    };

    async addProductToCart(cid, pid, quantity) {
        try {
            const cartFile = await fs.readFile(this.path, "utf-8");
            let cartList = JSON.parse(cartFile);
    
            const cartIndex = cartList.findIndex((c) => c.id === cid);
            if (cartIndex === -1) {
                throw new Error("No se encontró el carrito. Intentelo nuevamente");
            }
    
            const cart = cartList[cartIndex];
            const existingProductIndex = cart.products.findIndex((p) => p.id === pid);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({
                    id: pid,
                    quantity: quantity,
                });
            }
    
            cartList[cartIndex] = cart;
    
            await fs.writeFile(this.path, JSON.stringify(cartList, null, 2));
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    };
    
    async getCartById(id) {
        try {
            const cartFile = await fs.readFile(this.path, "utf-8");
            let cart = JSON.parse(cartFile);
    
            const searchCart = cart.find((c) => c.id === id);
    
            if (searchCart) {
                return searchCart;
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    async getProductFromCartId(id) {
        try {

            const cartFile = await this.readFile(this.path, "utf-8");
            let cart = JSON.parse(cartFile)
            
            const products = cart.find(product => product.id === id);

            if (!products) {
                throw new Error;
            }
            return products.products;

        } catch (error) {
            throw new Error(error);
        }
    }
    
};

export default CartManager;