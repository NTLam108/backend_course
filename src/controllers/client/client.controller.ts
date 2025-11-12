import { Request, Response } from "express"
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

export { getProductPage, get404page }