import express from "express";
import { Express } from "express"
import { getCreateUserpage, getHomepage, getViewUser, postCreateUserpage, postDeleteUser, postUpdateUser } from "controllers/user.controller";
import { getAdminCarPage, getAdminRentalPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get("/", getHomepage)
    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)

    app.use("/", router)   // "/" == website bay dau tu duong dan nao

    //admin route
    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/car", getAdminCarPage)
    router.get("/admin/rental", getAdminRentalPage)
    router.post("/admin/handle-delete-user/:id", postDeleteUser)
    router.get("admin/handle-view-user/:id", getViewUser)
    router.get("/admin/create-user", getCreateUserpage)
    router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser)
    router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUserpage)
}

export default webRoutes;

