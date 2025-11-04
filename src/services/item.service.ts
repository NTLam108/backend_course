import { prisma } from "config/client"

const getItemCar = async () => {
    const cars = await prisma.car.findMany();
    return cars;
}

export { getItemCar }