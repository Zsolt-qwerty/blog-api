import express from "express";
import morgan from "morgan";

import blogRouter from "./routes/local.routes.js";
import dbRouter from "./routes/remote.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/db/blogs", dbRouter);

// GET /api/welcome
app.use("/api/welcome", function (req, res) {
    res.status(200).send('Welcome to the blog API! Please use "./api/db/blogs/" path!');
});

export default app;
