import express from "express" //import
import "dotenv/config"  // cu phap su dung voi typescript
import webRoutes from "./routes/web";
const app = express(); //tao express application
const PORT = process.env.PORT || 8080; //init port
//neu process.env.PORT undefined thi se lay gia tri 8080

// khai bao route
// req (request), res (response) la 2 object trong moi truong Node.js

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static file: images/javasscript/css
app.use(express.static('public'));

//config routes
webRoutes(app);

//run server tren port da dc khoi tao truoc do
//nap cac thong tin khai bao o tren roi chay
app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`)
    console.log(__dirname + '/views')
})