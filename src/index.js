require("./db/mongoose");
const express = require("express");
const productRouter = require("./routers/product");
const userRouter = require("./routers/user");
const maintainenceMiddleware = require("./middlewares/maintainence");

const app = express();
const port = process.env.port || 3000;

// setup a express middleware for maintainence mode
// app.use(maintainenceMiddleware);

app.use(express.json());
app.use('/products',productRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log("server is up and running on port "+ port);
});
