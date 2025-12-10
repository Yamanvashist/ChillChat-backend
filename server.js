const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const connect = require("./connection")

// 1. Load env first
dotenv.config();

const app = express();

connect();
// 2. Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json()); // <-- important for POST body
app.use(cookieParser()); // <--- MUST be before your routes


// 3. Routes
app.use("/api/user", userRoute);

// 4. Server
const server = http.createServer(app);

server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
