// npm packages
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";
import animalRoute from "./routes/dierenRouter.js";
import rassenRoute from "./routes/rassenRouter.js";
import merkenRoute from "./routes/merkenRouter.js";
import variantRoute from "./routes/variantRouter.js";
import loginRoute from "./routes/auth/login.js";
import registerRoute from "./routes/auth/register.js";
import petsRoute from "./routes/petsRouter.js";

// Create an express application
const app = express();
app.use(cors());

//configure environment variables
dotenv.config();

//configuring port
const PORT = process.env.PORT;

// Connection to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

//middleware
app.use(express.json());

// Routes
app.use("/api", animalRoute);
app.use("/api", rassenRoute);
app.use("/api", variantRoute);
app.use("/api", merkenRoute);
app.use("/api", petsRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/auth/login", loginRoute);
app.use("/auth/register", registerRoute);

// Port connection
app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
