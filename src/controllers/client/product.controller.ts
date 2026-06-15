import { Request, Response } from "express";
import { syncBuiltinESMExports } from "module";
import { getOrderHistory, handleAddtoCart, handleDeleteProduct, handlePlaceOrder, showCartDetail, updateCartDetailBeforeCheckout } from "services/item.service";
import { handleGetToolSuitable } from "services/rental.service";
import generateStripeSession from "services/stripe.service";

const postAddCartoCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    if (user) {
        await handleAddtoCart(1, +id, user);
    }
    else {
        // nếu chưa đăng nhập
        return res.redirect("/login")
    }
    return res.redirect("back");
}

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login");
    }

    const cartDetails = await showCartDetail(user.id);

    const totalPrice = cartDetails?.map(item => item.quantity * item.price)?.reduce((a, b) => a + b, 0);

    const suitableTools = await handleGetToolSuitable(user.id);

    return res.render("client/rental/cart.ejs", {
        cartDetails, totalPrice, suitableTools
    })
}

const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    if (user) {
        await handleDeleteProduct(+id, user.sumCart);
    } else {
        return res.redirect("/login")
    }
    return res.redirect("/cart")
}

const postHandleCartToCheckOut = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
        return res.redirect("/login");
    }
    const currentCartDetail: { id: string; quantity: string }[] = req.body?.cartDetails ?? [];

    await updateCartDetailBeforeCheckout(currentCartDetail)
    return res.redirect("/checkout")
}
const postPlaceOrder = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return res.redirect("/login")

    const { renterName, renterAddress, renterPhone, pickupDate, dropoffDate, pickupPlace, thanhTien } = req.body
    const result = await handlePlaceOrder(user.id, renterName, renterAddress, renterPhone, pickupDate, dropoffDate, pickupPlace, thanhTien)

    if (!result.success) {
        return res.render("client/other/sorry.ejs", { message: result.message })
    }

    const host = req.get('host')!;

    const session = await generateStripeSession(user.id, host)

    return res.redirect(303, session.url!);
}

const getThanksPage = (req: Request, res: Response) => {
    const user = req.user
    if (!user) return res.redirect("/login")

    return res.render("client/other/thanks.ejs")
}

const getSorryPage = (req: Request, res: Response) => {
    const user = req.user
    if (!user) return res.redirect("/login")

    return res.render("client/other/sorry.ejs")
}

const getOrderHistoryPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login");
    }

    const orders = await getOrderHistory(user.id);

    return res.render("client/rental/orderhistory.ejs", {
        orders
    })
}

export { postAddCartoCart, getCartPage, postDeleteProductInCart, postHandleCartToCheckOut, postPlaceOrder, getThanksPage, getOrderHistoryPage, getSorryPage }