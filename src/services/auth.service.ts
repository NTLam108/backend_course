import { prisma } from "config/client"
import { hashPassword } from "./user.service";
import { ACCOUNT_TYPE } from "config/constant";

const isEmailExist = async (email: string) => {
    const username = await prisma.user.findUnique({
        where: { username: email }
    })
    if (username) {
        return true;
    } else {
        return false;
    }
}

const registerNewUser = async (
    fullname: string,
    username: string,
    password: string
) => {
    const newPassword = await hashPassword(password);

    const userRole = await prisma.role.findUnique({
        where: { name: "USER" }
    })

    if (userRole) {
        await prisma.user.create({
            data: {
                fullname: fullname,
                username: username,
                password: newPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id
            }
        })
    }
    else {
        throw new Error("User Role không tồn tại")
    }
}
export { isEmailExist, registerNewUser }