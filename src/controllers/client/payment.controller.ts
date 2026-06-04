import Stripe from "stripe";
import { Request, Response } from 'express';
import generateStripeSession from "services/stripe.service";
import { prisma } from "config/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-12-18.acacia' as any
})

const renderSuccess = async (req: Request, res: Response) => {
    try {
        const sessionId = req.query.session_id as string;
        if (!sessionId) return res.redirect('/');

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const rentalId = session.metadata?.rentalId;

        if (rentalId) {
            await prisma.rental.update({
                where: { id: parseInt(rentalId, 10) },
                data: {
                    status: 'PAID',
                    paymentStatus: 'PAID'
                }
            })
        }

        res.render('client/other/thanks.ejs')
    } catch (error) {
        console.error("Stripe Error: ", error);
        res.status(500).send("Lỗi xác nhận đơn hàng")
    }
}

export { renderSuccess }