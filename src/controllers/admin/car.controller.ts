import { prisma } from "config/client";
import { Request, Response } from "express"
import { getCarDetailbyId, handleCreateCar, handleDeleteCar, updateCarbyId } from "services/car.service";
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

const getViewCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await getCarDetailbyId(id);

    const brandOptions = [
        { name: "Toyota", value: "Toyota" },
        { name: "VinFast", value: "VinFast" },
        { name: "Huyndai", value: "Huyndai" },
        { name: "Kia", value: "Kia" },
        { name: "Honda", value: "Honda" },
        { name: "Mazda", value: "Mazda" },
        { name: "Mitsubishi", value: "Mitsubishi" },
        { name: "Ford", value: "Ford" },
    ]

    const carOptions = [
        { name: "SUV", value: "SUV" },
        { name: "HatchBack", value: "HatchBack" },
        { name: "Sedan", value: "Sedan" },
        { name: "VAN", value: "VAN" },
        { name: "COUPE", value: "COUPE" },
        { name: "CUV", value: "CUV" },
        { name: "MPV", value: "MPV" },
        { name: "PICKUP", value: "PICKUP" },
    ]

    const engineOptions = [
        { name: "Hybrid", value: "Hybrid" },
        { name: "Electric", value: "Electric" },
        { name: "Gasoline", value: "Gasoline" },
        { name: "Diesel", value: "Diesel" },
    ]

    const statusOptions = [
        { name: "Ready", value: "Ready" },
        { name: "Rented", value: "Rented" },
    ]

    return res.render("admin/car/detail.ejs", {
        car,
        brandOptions,
        carOptions,
        engineOptions,
        statusOptions
    })
}

const postUpdateCar = async (req: Request, res: Response) => {
    const { id, name, priceperday, brand, carType, seat, engine, status, detailCar } = req.body;
    const file = req.file;
    const carImage = file?.filename ?? undefined
    await updateCarbyId(id, name, +priceperday, brand, carType, +seat, engine, status, carImage, detailCar)
    return res.redirect("/admin/car");
}

export { getCreateCarPage, postCreateCar, postDeleteCar, getViewCar, postUpdateCar }