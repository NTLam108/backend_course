import { Request, Response } from "express"
import { getAllCars } from "services/car.service";
import { getCarById } from "services/item.service";
import { getAllTool } from "services/tool.service";


const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await getCarById(+id);
    return res.render("client/car/detail.ejs", {
        car
    });
}

const get404page = (req: Request, res: Response) => {
    return res.render("client/other/page404.ejs")
}

const getCarsPage = async (req: Request, res: Response) => {
    const cars = await getAllCars();
    return res.render("client/car/carlist.ejs", {
        cars
    });
}

const getCheckoutPage = (req: Request, res: Response) => {
    return res.render("client/rental/detail.ejs");
}
const getContactPage = (req: Request, res: Response) => {
    return res.render("client/other/contact.ejs");
}
const getToolPage = async (req: Request, res: Response) => {
    const tools = await getAllTool();
    return res.render("client/tool/tools.ejs", {
        tools
    });
}



export { getProductPage, get404page, getCarsPage, getCheckoutPage, getContactPage, getToolPage }