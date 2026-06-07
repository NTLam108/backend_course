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

        if (yourDetailCart && yourDetailCart.car) {
            const suitableTool = await prisma.carTool.findMany({
                where: { suitable_for: yourDetailCart.car.carType }
            })
            return suitableTool;
        }
    }
    // Return all tools if no specific car in cart
    return await prisma.carTool.findMany({ take: 3 });
}
export { getAllRental, handleViewRentalDetail, handleGetToolSuitable }