import { prisma } from "config/client";
import { Request, Response } from "express"
import { handleCreateCar, handleDeleteCar } from "services/car.service";
import { CarSchema, TCarSchema } from "src/validation/car.schema";
const getCreateCarPage = (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        priceperday: "",
        brand: "",
        carType: "",
        seat: "",
        engine: "",
        status: "",
        detailCar: "",
    }
    return res.render("admin/car/create.ejs", {
        errors, oldData
    });
}

const postCreateCar = async (req: Request, res: Response) => {
    const { name, priceperday, brand, carType, seat, engine, status, detailCar } = req.body as TCarSchema;
    const validate = CarSchema.safeParse(req.body);

    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
        const oldData = {
            name: name,
            priceperday: priceperday,
            brand: brand,
            carType: carType,
            seat: seat,
            engine: engine,
            status: status,
            detailCar: detailCar,
        }

        return res.render("admin/car/create.ejs", {
            errors, oldData
        });
    }
    //success
    const file = req.file;
    const carImage = file?.filename ?? null
    await handleCreateCar(name, +priceperday, brand, carType, +seat, engine, status, carImage, detailCar);
    return res.redirect("/admin/car");
}

const postDeleteCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteCar(id);
    return res.redirect("/admin/car");
}


export { getCreateCarPage, postCreateCar, postDeleteCar }