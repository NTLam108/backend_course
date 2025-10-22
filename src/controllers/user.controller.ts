import { Request, Response } from "express";
import { getAllUsers, getUserbyID, handleCreateUser, handleDeleteUser, updateUserbyID } from "services/user.service";

const getHomepage = async (req: Request, res: Response) => {
    //get users data
    const users = await getAllUsers();
    return res.render("home", {
        users: users
    })  // de hien thi data len view
}

const getCreateUserpage = (req: Request, res: Response) => {
    return res.render("create-user")
}

const postCreateUserpage = async (req: Request, res: Response) => {
    //destructuring
    const { username, email, address } = req.body;

    //handle create user (services)
    const a = await handleCreateUser(username, email, address)
    return res.redirect("/")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    //get user detail by id
    const user = await getUserbyID(id);

    return res.render("view-user", {
        id: id,
        user: user
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, username, email, address } = req.body;
    await updateUserbyID(id, username, email, address);
    return res.redirect("/");
}



export {
    getHomepage, getCreateUserpage, postCreateUserpage, postDeleteUser, getViewUser,
    postUpdateUser
};
