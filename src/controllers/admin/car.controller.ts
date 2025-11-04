import { Request, Response } from "express"
const getCreateCarPage = (req: Request, res: Response) => {
    return res.render("admin/car/create.ejs");
}

const postCreateCar = (req: Request, res: Response) => {
    const { name } = req.body;
    return res.redirect("/admin/car");
}
export { getCreateCarPage, postCreateCar }