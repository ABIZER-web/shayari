app.set('trust proxy', true); // So req.ip works correctly behind proxy (e.g. Vercel, Railway)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const shayariRoutes = require("./routes/shayari");
const ratingRoutes = require("./routes/rating");

app.use("/api/auth", authRoutes);
app.use("/api/shayari", shayariRoutes);
app.use("/api/rating", ratingRoutes);

// DB Connect + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
