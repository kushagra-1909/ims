const express = require("express");
const app = express();
app.use(express.json());
require("./config/dbConnect");
const PORT = 9000;

const usersRoute = require("./routes/usersRoute");
const itemsRoute = require("./routes/itemsRoute");
const requestsRoute = require("./routes/requestsRoute");
const globalErrhandler = require("./middlewares/globalErrHandler");

app.use("/api/users", usersRoute);
app.use("/api/items", itemsRoute);
app.use("/api/requests", requestsRoute);

// global error middleware
app.use(globalErrhandler);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
