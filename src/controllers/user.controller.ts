import { Request, Response } from "express";
import { getAllRole, getAllUsers, getUserbyID, handleCreateUser, handleDeleteUser, updateUserbyID } from "services/user.service";

const getHomepage = async (req: Request, res: Response) => {
    return res.render("client/home/show.ejs")
}

const getCreateUserpage = async (req: Request, res: Response) => {
    const roles = await getAllRole();
    return res.render("admin/user/create.ejs", {
        roles: roles
    })
}

const postCreateUserpage = async (req: Request, res: Response) => {
    //destructuring
    const { username, password, fullname, address, phone, accountType, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null

    //handle create user (services)
    await handleCreateUser(username, password, fullname, address, phone, accountType, avatar, role)
    return res.redirect("/admin/user")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/admin/user")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    //get user detail by id
    const user = await getUserbyID(id);
    const roles = await getAllRole();

    return res.render("admin/user/detail.ejs", {
        id: id,
        user: user,
        roles
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullname, address, phone, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined
    await updateUserbyID(id, fullname, phone, address, role, avatar)
    return res.redirect("/admin/user");
}



export {
    getHomepage, getCreateUserpage, postCreateUserpage, postDeleteUser, getViewUser,
    postUpdateUser
};
