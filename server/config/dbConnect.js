const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://kushagra:kishu1234@inventory-management-sy.esa5dxj.mongodb.net/inventory-management-system?retryWrites=true&w=majority&appName=inventory-management-system"
    )
    .then(console.log("db connected"))
    .catch((err) => {
      console.log(err);
    });
};

dbConnect();
