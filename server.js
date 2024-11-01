const express = require("express");
const app = express();
app.use(express.json());
require("./server/config/dbConnect");
const PORT = 9000;

const usersRoute = require("./server/routes/usersRoute");
const itemsRoute = require("./server/routes/itemsRoute");
const requestsRoute = require("./server/routes/requestsRoute");
const orderRoute = require("./server/routes/orderRoute");
const globalErrhandler = require("./server/middlewares/globalErrHandler");

app.use("/api/users", usersRoute);
app.use("/api/items", itemsRoute);
app.use("/api/requests", requestsRoute);
app.use("/api/orders", orderRoute);

// global error middleware
app.use(globalErrhandler);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
