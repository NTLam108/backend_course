import { NextFunction, Request, Response } from "express"
import { registerNewUser } from "services/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/auth.schema";
const getLoginPage = (req: Request, res: Response) => {
    const { session } = req as any;
    const messages = session?.messages ?? []   //lay message trong phan session
    return res.render("client/auth/login.ejs", {
        messages
    });
}

const getRegisterPage = (req: Request, res: Response) => {

    const errors = [];
    const oldData = {
        fullname: "",
        username: "",
        password: "",
        confirmPassword: ""
    }
    return res.render("client/auth/register.ejs", {
        errors, oldData
    });
}

const postRegister = async (req: Request, res: Response) => {
    const { fullname, username, password, confirmPassword } = req.body as TRegisterSchema;
    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`)

        const oldData = {
            fullname, username, password, confirmPassword
        }
        res.render("client/auth/register.ejs", {
            errors, oldData
        })
    }

    await registerNewUser(fullname, username, password);
    return res.redirect("/login");
}

const getSuccessRedirectPage = (req: Request, res: Response) => {
    const user = req.user;
    if (user?.role?.name === "ADMIN") {
        res.redirect("/admin")
    } else {
        res.redirect("/")
    }
}

const postLogout = (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}


export { getLoginPage, getRegisterPage, postRegister, getSuccessRedirectPage, postLogout }