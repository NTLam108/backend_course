import { prisma } from "config/client"
import Stripe from "stripe"

const stripe = new Stripe('STRIPE_SECRET_KEY'!, {
    apiVersion: '2025-12-15.clover'
})

const parseDateVN = (str: any) => {
    const parts = str.split('/');
    if (parts.length === 3) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    return null;
}

const generateStripeSession = async (id: number, host: string) => {
    const carsrental = await prisma.rental.findFirst({
        where: { userId: id },
        include: {
            rentalDetails: {
                include: {
                    car: true
                }
            }
        },
        orderBy: { id: 'desc' }
    })


    if (!carsrental) throw new Error("Đơn thuê không tồn tại");

    // 2. Tính số ngày thuê
    const start = parseDateVN(carsrental.pickupdate);
    const end = parseDateVN(carsrental.dropoffdate);

    // Tính chênh lệch mili giây và chuyển sang số ngày
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Ít nhất là 1 ngày

    const line_items = carsrental.rentalDetails.map((detail) => {
        return {
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: `Thuê xe: ${detail.car.brand} ${detail.car.name}`,
                    description: `Thuê trong ${diffDays} ngày (Từ ${carsrental.pickupdate} đến ${carsrental.dropoffdate})`,
                },
                unit_amount: detail.car.priceperday,
            },
            quantity: detail.quantity * diffDays
        }
    })

    const shippingFee = 50000;
    line_items.push({
        price_data: {
            currency: 'vnd',
            product_data: {
                name: 'Phí vận chuyển / Giao xe tận nơi',
                description: `Dịch vụ giao xe tận nơi cho khách hàng`
            },
            unit_amount: shippingFee,
        },
        quantity: 1,
    })


    //tao session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',

        metadata: {
            rentalId: carsrental.id.toString(),
        },

        success_url: `http://${host}/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://${host}/sorry`,
    })

    return session;
}

export default generateStripeSession