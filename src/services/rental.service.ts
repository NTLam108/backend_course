import { prisma } from "config/client"

const getAllRental = async () => {
    const rentalView = await prisma.rental.findMany({
        include: {
            user: true
        }
    })
    return rentalView;
}

const handleViewRentalDetail = async (id: number) => {
    const rental = await prisma.rental_detail.findMany({
        where: { rentalId: id },
        include: {
            car: true
        }
    })
    return rental;
}

const handleGetToolSuitable = async (id: number) => {
    const yourCart = await prisma.cart.findUnique({
        where: { userId: id }
    })
    if (yourCart) {
        const yourDetailCart = await prisma.cartDetail.findFirst({
            where: {
                cartId: yourCart.id
            },
            include: {
                car: true,
            }
        })
        const suitableTool = await prisma.carTool.findMany({
            where: { suitable_for: yourDetailCart.car.carType }
        })
        return suitableTool;
    }
    return [];
}
export { getAllRental, handleViewRentalDetail, handleGetToolSuitable }