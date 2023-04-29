require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Set up routes
app.use("/api", routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
