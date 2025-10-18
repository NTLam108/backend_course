const express = require("express");
//tao 1 object express
const app = express();
const PORT = 8080;

// in ra hello world
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/hoidanit", (req, res) => {
    res.send("Hello World with HoiDanIT")
})

// lang nghe cong
app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`)
})