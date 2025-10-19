import express from "express";
import { Express } from "express"
import { getCreateUserpage, getHomepage, postCreateUserpage } from "../controllers/user.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get("/", getHomepage)
    router.get("/create-user", getCreateUserpage)
    router.post("/handle-create-user", postCreateUserpage)
    app.use("/", router)   // "/" == website bay dau tu duong dan nao
}

export default webRoutes;

