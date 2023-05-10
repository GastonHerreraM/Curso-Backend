import express from "express"
import ProductRouter from "./routes/ProductRouter.js";
import CartRouter from "./routes/CartRouter.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";

const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080")
});

const socketServer = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
