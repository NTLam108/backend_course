import { prisma } from "config/client"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-12-18.acacia' as any
})

const parseDateVN = (str: any) => {
    if (!str || typeof str !== 'string') return null;
    const parts = str.split('/');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        return isNaN(date.getTime()) ? null : date;
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

    let diffDays = 1;
    if (start && end) {
        // Tính chênh lệch mili giây và chuyển sang số ngày
        const diffTime = Math.abs(end.getTime() - start.getTime());
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Ít nhất là 1 ngày
    }

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