import Stripe from "stripe";
import { Request, Response } from 'express';
import generateStripeSession from "services/stripe.service";
import { prisma } from "config/client";

const stripe = new Stripe('sk_test_51SrgOkBxwZtST2AmGm98CKpaHHntpSfUf22MWNbfzFvdd5lboXBrDwC2NqqNhAxFmhdl9jBRH9MFeMWJegu5xzhi00MsMq4VSj'!, {
    apiVersion: '2025-12-15.clover'
})


const renderSuccess = async (req: Request, res: Response) => {
    try {
        const sessionId = req.query.session_id as string;
        if (!sessionId) return res.redirect('/');

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const rentalId = session.metadata?.rentalId;

        await prisma.rental.update({
            where: { id: +rentalId },
            data: {
                status: 'PAID'
            }
        })

        res.render('client/other/thanks.ejs')
    } catch (error) {
        res.status(500).send("Lỗi xác nhận đơn hàng")
    }
}

export { renderSuccess }