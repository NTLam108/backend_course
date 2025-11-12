/// <reference path="./types/index.d.ts" />
import express from "express" //import
import "dotenv/config"  // cu phap su dung voi typescript
import webRoutes from "src/routes/web";
import getConnection from "./config/database";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
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

//config session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            // xoa nhung ban ghi da het han moi mot ngay
            checkPeriod: 1 * 24 * 60 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))
//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassportLocal()

app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views 
    next();
});


//config routes
webRoutes(app);

//run server tren port da dc khoi tao truoc do

//seedingdata
initDatabase();
//nap cac thong tin khai bao o tren roi chay


//handle 404 not found
app.use((req, res) => {
    res.render("client/other/page404.ejs")
})

app.listen(PORT, () => {
    console.log(`My app is running on port 123: ${PORT}`)
    console.log(__dirname + '/views')
})