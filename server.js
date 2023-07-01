//required imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const swaggerUi = require('swagger-ui-express') // Importing Swagger UI for API documentation
const swaggerFile = require('./swagger_output.json')

//Route Imports
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const searchRoutes = require("./routes/searchRoutes");

// Create Express app
const app = express(); 
app.use(express.json());


// Endpoint routes
app.use("/", itemRoutes);
app.use('/',authRoutes);
app.use('/',cartRoutes);
app.use('/',orderRoutes);
app.use('/',searchRoutes);

//Endpoint for Swagger Documentation
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))



// Connecting to mongoDB and start the server
const dbURI = config.get("dbURI"); // Getting the MongoDB connection URI from the configuration file
const port = process.env.PORT || 4000;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port);
    console.log(`listening on port ${port}`);
    console.log("successfully connected to mongodb")
  })
  .catch((err) => console.log(err));
