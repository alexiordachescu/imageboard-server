const express = require("express");
const app = express();
const jsonParser = express.json();
const port = 4000;
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");

app.use(jsonParser);

app.use("/login", authRouter);
app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(port, () => console.log(`Up and running on ${port}`));
