const express = require("express");
var cors = require("cors");

const app = express();

// middleware
const corsOptions = {
  origin: '*', // Allow all origins, but it's better to specify specific origins for security.
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

app.use(express.json());
app.use(cors(corsOptions));

const port = 5678;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes=require("./routes/orderRoutes")
const supplierRoutes=require("./routes/supplierRoutes")
const supplierproductRoute=require("./routes/productsupplierRoute")
const reportRoutes=require("./routes/reportRoutes")


app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order",orderRoutes)
app.use("/api/supplier",supplierRoutes)
app.use("/api",supplierproductRoute)
app.use("/api",reportRoutes)


app.listen(port, () => {
  console.log("My server has started on the port for IMSSI  " + port);
});
