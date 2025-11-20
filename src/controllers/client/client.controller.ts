import { Request, Response } from "express"
import { getAllCars } from "services/car.service";
import { getCarById } from "services/item.service";


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

export { getProductPage, get404page, getCarsPage }