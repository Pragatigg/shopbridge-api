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

//Trial
const Product = require("./models/product");
const User = require("./models/user");

const main = async () => {
  const product = await Product.findById('611bbf6a7d6e8919fc7df5e8');
  await product.populate('owner').execPopulate();
  console.log(product.owner);

  const user = await User.findById("611bbf617d6e8919fc7df5e2");
  await user.populate('products').execPopulate();
  console.log(user.products);
}

main();
