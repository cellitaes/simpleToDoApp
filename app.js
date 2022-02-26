// npx concurrently "npm run server" "cd ./client/ && npm start"

const express = require("express");
const mongo = require("mongodb");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(['/', '/*'], express.static(
    path.join(__dirname, "client/public"),
));

app.listen(4000, () => {
    console.log("Sever is listening at http://localhost:4000/");
})

taskRoutes(app, mongo);

