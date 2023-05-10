import 'dotenv/config'
import express from 'express'
import routerProducts from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import mongoose from "mongoose"

void (async() => {

    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/api/products', routerProducts)
    app.use('/api/carts', routerCart)
    app.listen(8081, () => {
        console.log('Server listening on port 8081');
      });
})();
