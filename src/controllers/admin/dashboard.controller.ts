import { Request, Response } from "express";
import { getAllUsers } from "services/user.service";


const getDashboardPage = async (req: Request, res: Response) => {

    return res.render("admin/dashboard/show.ejs")
}


const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render("admin/user/show.ejs", {
        users: users
    })
}

const getAdminCarPage = async (req: Request, res: Response) => {
    return res.render("admin/car/show.ejs")
}

const getAdminRentalPage = async (req: Request, res: Response) => {
    return res.render("admin/rental/show.ejs")
}
export { getDashboardPage, getAdminUserPage, getAdminCarPage, getAdminRentalPage }