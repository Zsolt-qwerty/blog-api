import app from "../app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`"blog-api" listening on http://localhost:${PORT}`);
});
