
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

const handleAddtoCart = async (
    quantity: number,
    carId: number,
    user: Express.User
) => {

    const cart = await prisma.cart.findUnique({
        where: { userId: user.id }
    })

    const car = await prisma.car.findUnique({
        where: {
            id: carId
        }
    })

    if (cart) {
        //update cart
        //cập nhật sum của cart
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                sum: {
                    increment: quantity,
                },
            }
        })


        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                carId: carId,
                cartId: cart.id
            }
        })
        //cập nhật lại cartdetail
        //nếu chưa có => tạo mới
        //nếu có rồi => cập nhật quantity
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0  //nếu chưa tồn tại cartDetail thì sẽ trả về kết quả id là null => lỗi => fix lỗi bằng cách này
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                price: car.priceperday,
                quantity: quantity,
                carId: carId,
                cartId: cart.id
            },
        })
    }
    else {
        //create new cart
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            price: car.priceperday,
                            quantity: quantity,
                            carId: car.id,
                        }
                    ]
                }
            }
        });
    }
}

const showCartDetail = async (id: number) => {
    const yourCart = await prisma.cart.findUnique({
        where: {
            userId: id,
        }
    })

    if (yourCart) {
        const yourDetailCart = await prisma.cartDetail.findMany({
            where: {
                cartId: yourCart.id
            },
            include: {
                car: true,
            }
        })

        return yourDetailCart;
    }
    return [];
}

export { getItemCar, getCarById, handleAddtoCart, showCartDetail }