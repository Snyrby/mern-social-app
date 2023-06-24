require("dotenv").config();
require("express-async-errors");

const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const fileUpload = require("express-fileupload");

// database
const connectDB = require("./db/connect");

// Router
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const root = path.join(__dirname, "../");

// CONFIGURATIONS
app.use(
  cors({ origin: true, credentials: true, exposedHeaders: ["set-cookie"] })
);
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
// app.use(express.static('./public'))
app.use(fileUpload());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.use(express.static(path.resolve(root, "./client/build")));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(root, "./client/build", "index.html"));
// });

// MONGOOSE SETUP
const port = process.env.PORT || 6001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
