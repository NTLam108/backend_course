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

const getAllCars = async (
    page: number,
    pageSize: number = 9,
    filters: {
        brand?: string,
        carType?: string,
        engine?: string,
        seat?: number,
        minPrice?: number,
        maxPrice?: number
    } = {},
    sortBy: string = 'featured'
) => {
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (filters.brand) where.brand = filters.brand;
    if (filters.carType) where.carType = filters.carType;
    if (filters.engine) where.engine = filters.engine;
    if (filters.seat) where.seat = filters.seat;
    if (filters.minPrice || filters.maxPrice) {
        where.priceperday = {
            gte: filters.minPrice || 0,
            lte: filters.maxPrice || 1000000000
        };
    }

    let orderBy: any = {};
    if (sortBy === 'priceLowToHigh') {
        orderBy = { priceperday: 'asc' };
    } else if (sortBy === 'priceHighToLow') {
        orderBy = { priceperday: 'desc' };
    } else {
        orderBy = { id: 'desc' }; // Featured or Default
    }

    const [cars, total] = await Promise.all([
        prisma.car.findMany({
            where,
            skip,
            take: pageSize,
            orderBy
        }),
        prisma.car.count({ where })
    ]);

    return {
        cars,
        total,
        totalPages: Math.ceil(total / pageSize)
    };
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