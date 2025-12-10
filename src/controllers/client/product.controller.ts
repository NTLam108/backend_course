import { Request, Response } from "express";
import { handleAddtoCart, showCartDetail } from "services/item.service";


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

export { postAddCartoCart, getCartPage }