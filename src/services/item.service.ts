import { prisma } from "config/client"

const getItemCar = async () => {
    const cars = await prisma.car.findMany();
    return cars;
}

const getCarById = async (id: number) => {
    return await prisma.car.findUnique({
        where: { id }
    });
}

export { getItemCar, getCarById }