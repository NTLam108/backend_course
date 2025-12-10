import { Request, Response } from "express";
import { getAllCars } from "services/car.service";
import { getAllTool, handleCreateTool, handleDeleteTool, handleUpdateTool, handleViewTool } from "services/tool.service";
import { getAllUsers } from "services/user.service";
import { toolSchema, TtoolSchema } from "src/validation/tool.schema";


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
    const cars = await getAllCars();
    return res.render("admin/car/show.ejs", {
        cars: cars
    })
}

const getAdminRentalPage = async (req: Request, res: Response) => {
    return res.render("admin/rental/show.ejs")
}

const getAdminToolPage = async (req: Request, res: Response) => {
    const tools = await getAllTool();
    return res.render("admin/tool/show.ejs", {
        tools: tools
    });
}
const getCreateTool = (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        quantity: "",
        status: "",
        descTool: "",
    }
    return res.render("admin/tool/create.ejs", {
        errors, oldData
    });
}

//     name: string,
//     price: number,
//     quantity: number,
//     status: string,
//     descTool: string,
//     imgTool: string
const postCreateTool = async (req: Request, res: Response) => {
    const { name, price, quantity, status, descTool } = req.body as TtoolSchema;
    const validate = toolSchema.safeParse(req.body);

    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
        const oldData = {
            name: name,
            price: price,
            quantity: quantity,
            status: status,
            descTool: descTool
        }

        return res.render("admin/tool/create.ejs", {
            errors, oldData
        });
    }
    //success
    const file = req.file;
    const imgTool = file?.filename ?? null
    await handleCreateTool(name, +price, +quantity, status, descTool, imgTool);
    return res.redirect("/admin/tool");
}

const postDeleteTool = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteTool(id)
    return res.redirect("/admin/tool");
}

const getViewTool = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tool = await handleViewTool(id);

    const statusOptions = [
        { name: "In Stock", value: "In Stock" },
        { name: "Out of Stock", value: "Out of Stock" },
    ]

    return res.render("admin/tool/detail.ejs", {
        tool,
        statusOptions
    });
}

const postUpdateTool = async (req: Request, res: Response) => {
    const { id, name, price, status, quantity, descTool } = req.body;
    const file = req.file;
    const imgTool = file?.filename ?? undefined
    await handleUpdateTool(id, name, +price, status, +quantity, descTool, imgTool);
    return res.redirect("/admin/tool")
}
export {
    getDashboardPage, getAdminUserPage, getAdminCarPage, getAdminRentalPage, getAdminToolPage, getCreateTool, postCreateTool,
    postDeleteTool, getViewTool, postUpdateTool
}