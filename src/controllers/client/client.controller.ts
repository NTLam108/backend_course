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
    const { page, engine, carType, brand, seat, sort, minPrice, maxPrice } = req.query;
    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    const filters = {
        engine: engine as string,
        carType: carType as string,
        brand: brand as string,
        seat: seat ? +seat : undefined,
        minPrice: minPrice ? +minPrice : undefined,
        maxPrice: maxPrice ? +maxPrice : undefined
    };

    const result = await getAllCars(currentPage, 9, filters, sort as string);

    return res.render("client/car/carlist.ejs", {
        cars: result.cars,
        totalPages: result.totalPages,
        currentPage: currentPage,
        filters: filters,
        sort: sort || 'featured'
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
    const { sort } = req.query;
    const tools = await getAllTool(sort as string);
    return res.render("client/tool/tools.ejs", {
        tools,
        sort: sort || 'featured'
    });
}

const postToolToCart = (req: Request, res: Response) => {

}



export { getProductPage, get404page, getCarsPage, getCheckoutPage, getContactPage, getToolPage, postToolToCart }