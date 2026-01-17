import { render } from "ejs";
import { Request, Response } from "express";
import { getAllCars } from "services/car.service";
import { getAllRental, handleViewRentalDetail } from "services/rental.service";
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
    const { page } = req.query;
    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;
    console.log("Page nhận được từ URL:", page);
    console.log("Current Page sau khi xử lý:", currentPage);
    const cars = await getAllCars(currentPage);
    return res.render("admin/car/show.ejs", {
        cars: cars
    })
}

const getAdminRentalPage = async (req: Request, res: Response) => {
    const rentals = await getAllRental();
    return res.render("admin/rental/show.ejs", {
        rentals
    })
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
        suitable_for: "",
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
    const { name, price, quantity, status, descTool, suitable_for } = req.body as TtoolSchema;
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
            descTool: descTool,
            suitable_for: suitable_for
        }

        return res.render("admin/tool/create.ejs", {
            errors, oldData
        });
    }
    //success
    const file = req.file;
    const imgTool = file?.filename ?? null
    await handleCreateTool(name, +price, +quantity, status, descTool, imgTool, suitable_for);
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

    const typeOptions = [
        { name: "SUV", value: "SUV" },
        { name: "HatchBack", value: "HatchBack" },
        { name: "Sedan", value: "Sedan" },
        { name: "VAN", value: "VAN" },
        { name: "COUPE", value: "COUPE" },
        { name: "CUV", value: "CUV" },
        { name: "MPV", value: "MPV" },
        { name: "PICKUP", value: "PICKUP" },
    ]

    return res.render("admin/tool/detail.ejs", {
        tool,
        statusOptions,
        typeOptions,
    });
}

const postUpdateTool = async (req: Request, res: Response) => {
    const { id, name, price, status, quantity, descTool } = req.body;
    const file = req.file;
    const imgTool = file?.filename ?? undefined
    await handleUpdateTool(id, name, +price, status, +quantity, descTool, imgTool);
    return res.redirect("/admin/tool")
}

const getViewRentalDetail = async (req: Request, res: Response) => {
    const { id } = req.params
    const rentals = await handleViewRentalDetail(+id)
    return res.render("admin/rental/detail.ejs", {
        rentals
    });
}
export {
    getDashboardPage, getAdminUserPage, getAdminCarPage, getAdminRentalPage, getAdminToolPage, getCreateTool, postCreateTool,
    postDeleteTool, getViewTool, postUpdateTool, getViewRentalDetail
}