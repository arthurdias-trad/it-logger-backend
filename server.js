const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require(path.join(__dirname, "config", "db"));

const app = express();

// Set environment variables
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Set up port
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Get router files
const techs = require(path.join(__dirname, "routes", "techs"));
const logs = require(path.join(__dirname, "routes", "logs"));

// Set up routers
app.use("/techs", techs);
app.use("/logs", logs);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
