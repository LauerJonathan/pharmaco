const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Gestionnaire d'erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
