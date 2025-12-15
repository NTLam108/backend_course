import { Request, Response } from "express"
import { getAllCars } from "services/car.service";
import { getCarById, showCartDetail } from "services/item.service";
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

const getCheckoutPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login");
    }

    const cartDetails = await showCartDetail(user.id);

    const totalPrice = cartDetails?.map(item => item.quantity * item.price)?.reduce((a, b) => a + b, 0);

    return res.render("client/rental/checkout.ejs", {
        cartDetails, totalPrice
    })
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

const postToolToCart = () => {

}



export { getProductPage, get404page, getCarsPage, getCheckoutPage, getContactPage, getToolPage, postToolToCart }