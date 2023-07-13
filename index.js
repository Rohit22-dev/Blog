import mongoose from "mongoose";
import express from "express";
import authRoute from "./routes/auth.js";
import blogRoute from "./routes/blog.js";
import { register } from "./controllers/Auth.js";
import cors from "cors";
import { createBlog } from "./controllers/blogs.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

const url =
  "mongodb+srv://Octivion:rk220101@cluster0.7euyxep.mongodb.net/?retryWrites=true&w=majority";
const port = 8080;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    })
  )
  .catch((err) => console.log(err));

app.post("/auth/register", register);
app.post("/blog", createBlog);

app.use("/auth", authRoute);
app.use("/blog", blogRoute);
