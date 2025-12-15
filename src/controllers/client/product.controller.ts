import { Request, Response } from "express";
import { syncBuiltinESMExports } from "module";
import { handleAddtoCart, handleDeleteProduct, handlePlaceOrder, showCartDetail, updateCartDetailBeforeCheckout } from "services/item.service";


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
    return res.redirect("/");
}

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login");
    }

    const cartDetails = await showCartDetail(user.id);

    const totalPrice = cartDetails?.map(item => item.quantity * item.price)?.reduce((a, b) => a + b, 0);

    return res.render("client/rental/cart.ejs", {
        cartDetails, totalPrice
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
    await handlePlaceOrder(user.id, renterName, renterAddress, renterPhone, pickupDate, dropoffDate, pickupPlace, +thanhTien)

    return res.redirect("/thanks")
}

const getThanksPage = (req: Request, res: Response) => {
    const user = req.user
    if (!user) return res.redirect("/login")

    return res.render("client/other/thanks.ejs")
}

export { postAddCartoCart, getCartPage, postDeleteProductInCart, postHandleCartToCheckOut, postPlaceOrder, getThanksPage }