
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

const handleDeleteProduct = async (id: number, sumCart: number) => {
    const deletecart = await prisma.cartDetail.delete({
        where: { id: id }
    })

    const currentCart = await prisma.cart.findUnique({
        where: { id: deletecart.cartId }
    })

    if (sumCart > 1) {
        await prisma.cart.update({
            where: { id: currentCart.id },
            data: {
                sum: currentCart.sum - deletecart.quantity,
            }
        })
    } else {
        await prisma.cart.delete({
            where: { id: currentCart.id }
        })
    }
}

const updateCartDetailBeforeCheckout = async (data: { id: string; quantity: string }[]) => {
    for (let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: {
                id: +(data[i].id)
            },
            data: {
                quantity: +(data[i].quantity)
            }
        })
    }
}

const handlePlaceOrder = async (
    userId: number,
    renterName: string,
    renterAddress: string,
    renterPhone: string,
    pickupDate: string,
    dropoffDate: string,
    pickupPlace: string,
    thanhTien: number
) => {
    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            cartDetails: true
        }
    })

    if (cart) {

        const dataRentalDetail = cart?.cartDetails?.map(
            item => ({
                price: item.price,
                quantity: item.quantity,
                carId: item.carId
            })
        ) ?? []
        //Tạo Order mới
        await prisma.rental.create({
            data: {
                renterName: renterName,
                renterAddress: renterAddress,
                renterPhone: renterPhone,
                pickupdate: pickupDate.toString(),
                dropoffdate: dropoffDate.toString(),
                pickupplace: pickupPlace,
                totalPrice: thanhTien,
                paymentMethod: "COD",
                paymentStatus: "PAYMENT_UNPAID",
                status: "PENDING",
                userId: userId,
                rentalDetails: {
                    create: dataRentalDetail
                }
            },
        })

        //Xóa cart + cartDetail
        await prisma.cartDetail.deleteMany({
            where: { cartId: cart.id }
        })
        await prisma.cart.delete({
            where: { id: cart.id }
        })
    }

}




export { getItemCar, getCarById, handleAddtoCart, showCartDetail, handleDeleteProduct, updateCartDetailBeforeCheckout, handlePlaceOrder }