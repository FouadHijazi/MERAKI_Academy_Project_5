const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/prodcuts");
const basketRouter = require("./routes/basket");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

const roleRouter = require("./routes/roles");
const permissionRouter = require("./routes/permission");
const typeOfFoodRouter = require("./routes/typeOfFood");
const orderRouter = require("./routes/order");

const app = express();

/* app.use(express.static(path.resolve(__dirname, "./client/build"))); */

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use("/role", roleRouter);
app.use("/permission", permissionRouter);

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/basket", basketRouter);

app.use("/typeOfFood", typeOfFoodRouter);
app.use("/order", orderRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
