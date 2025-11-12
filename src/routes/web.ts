import express from "express";
import { Express } from "express"
import { getCreateUserpage, getHomepage, getViewUser, postCreateUserpage, postDeleteUser, postUpdateUser } from "controllers/user.controller";
import { getAdminCarPage, getAdminRentalPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { get404page, getProductPage } from "controllers/client/client.controller";
import { getCreateCarPage, getViewCar, postCreateCar, postDeleteCar, postUpdateCar } from "controllers/admin/car.controller";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get("/", getHomepage)
    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)

    app.use("/", router)   // "/" == website bat dau tu duong dan nay
    //auth route
    router.get("/success-redirect", getSuccessRedirectPage)
    router.get("/login", isLogin, getLoginPage)
    router.get("/register", getRegisterPage)
    router.post("/register", postRegister)
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }));
    router.post("/logout", postLogout)
    //client route
    router.get("/car/:id", getProductPage)
    router.get("/404page", get404page)

    //admin route
    router.get("/admin", isAdmin, getDashboardPage)
    //user
    router.get("/admin/user", getAdminUserPage)
    router.post("/admin/handle-delete-user/:id", postDeleteUser)
    router.get("admin/handle-view-user/:id", getViewUser)
    router.get("/admin/create-user", getCreateUserpage)
    router.post("/admin/update-user", fileUploadMiddleware("avatar", "images/user-avatar"), postUpdateUser)
    router.post("/admin/handle-create-user", fileUploadMiddleware("avatar", "images/user-avatar"), postCreateUserpage)
    //car
    router.get("/admin/car", getAdminCarPage)
    router.get("/admin/create-car", getCreateCarPage)
    router.post("/admin/create-car", fileUploadMiddleware("carImage", "images/car-img"), postCreateCar)
    router.post("/admin/handle-delete-car/:id", postDeleteCar)
    router.get("/handle-view-car/:id", getViewCar)
    router.post("/admin/update-car", fileUploadMiddleware("carImage", "images/car-img"), postUpdateCar)
    //rental
    router.get("/admin/rental", getAdminRentalPage)

}

export default webRoutes;

