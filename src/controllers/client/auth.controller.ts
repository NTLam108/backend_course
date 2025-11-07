import { Request, Response } from "express"
import { registerNewUser } from "services/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/auth.schema";
const getLoginPage = (req: Request, res: Response) => {
    return res.render("client/auth/login.ejs");
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

export { getLoginPage, getRegisterPage, postRegister }