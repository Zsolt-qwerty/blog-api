import express from "express";
import morgan from "morgan";

import blogRouter from "./routes/routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());

app.use("/api/blogs", blogRouter);

// GET /blogs
app.use("/blogs", function (req, res) {
    res.send('Welcome to the blog API! Please use "./api/blogs/" path!');
});

export default app;
