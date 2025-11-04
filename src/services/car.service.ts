import { prisma } from "config/client"

const handleCreateCar = async (
    name: string,
    priceperday: number,
    brand: string,
    carType: string,
    seat: number,
    engine: string,
    status: string,
    carImage: string,
    detailCar: string,
) => {
    const newCar = await prisma.car.create({
        data: {
            name: name,
            priceperday: priceperday,
            brand: brand,
            carType: carType,
            seat: seat,
            engine: engine,
            status: status,
            carImage: carImage,
            detailCar: detailCar,
        }
    })
    return newCar;
}

const getAllCars = async () => {
    const cars = await prisma.car.findMany();
    return cars;
}
const handleDeleteCar = async (id: string) => {
    await prisma.car.delete({
        where: { id: +id }
    })
}

const getCarDetailbyId = async (id: string) => {
    const car = await prisma.car.findUnique({
        where: { id: +id }
    })
    return car;
}

const updateCarbyId = async (
    id: string,
    name: string,
    priceperday: number,
    brand: string,
    carType: string,
    seat: number,
    engine: string,
    status: string,
    carImage: string,
    detailCar: string,
) => {
    const updateCar = await prisma.car.update({
        where: { id: +id },
        data: {
            name: name,
            priceperday: priceperday,
            brand: brand,
            carType: carType,
            seat: seat,
            engine: engine,
            status: status,
            ...(carImage !== undefined && { carImage: carImage }),
            detailCar: detailCar
        },
    });
    return updateCar
}

export { handleCreateCar, getAllCars, handleDeleteCar, getCarDetailbyId, updateCarbyId }