import express from "express";
import { Express } from "express"
import { getCreateUserpage, getHomepage, getViewUser, postCreateUserpage, postDeleteUser, postUpdateUser } from "controllers/user.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get("/", getHomepage)
    router.get("/create-user", getCreateUserpage)
    router.post("/handle-create-user", postCreateUserpage)
    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)
    router.post("/handle-update-user", postUpdateUser)
    app.use("/", router)   // "/" == website bay dau tu duong dan nao
}

export default webRoutes;

