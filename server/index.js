const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");

dotenv.config();

// Models
require("./models/User");
require("./models/Rec");
require("./models/Ask");

// Services
require("./services/passport");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || "secretkey"],
  }),
);

// Compatibility middleware for Passport 0.7.0 and cookie-session
app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/curation_platform",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
require("./routes/authRoutes")(app);
app.use("/api/recs", require("./routes/recRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
