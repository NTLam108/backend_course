import { Request, Response } from "express";
import { handleCreateUser } from "../services/user.service";

const getHomepage = (req: Request, res: Response) => {
    return res.render("home")
}

const getCreateUserpage = (req: Request, res: Response) => {
    return res.render("create-user")
}

const postCreateUserpage = (req: Request, res: Response) => {
    //destructuring
    const { username, email, address } = req.body;

    //handle create user (services)
    handleCreateUser(username, email, address)
    return res.redirect("/")
}

export { getHomepage, getCreateUserpage, postCreateUserpage };