import { Request, Response } from "express"
import { getCarById } from "services/item.service";


const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await getCarById(+id);
    return res.render("client/car/detail.ejs", {
        car
    });
}

export { getProductPage }