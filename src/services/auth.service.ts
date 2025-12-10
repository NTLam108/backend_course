import { prisma } from "config/client"
import { comparePassword, hashPassword } from "./user.service";
import { ACCOUNT_TYPE } from "config/constant";
import { error } from "console";
import { compare } from "bcrypt";

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

const handleLogin = async (username: string, password: string, callback: any) => {
    //check user exist in db
    const user = await prisma.user.findUnique({
        where: { username: username }
    })

    if (!user) {
        //throw error
        // throw new Error(`Username: ${username} not found`)
        return callback(null, false, { message: `Username/password invalid` });

    }

    //compare password
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
        // throw new Error("Invalid password")
        return callback(null, false, { message: `Username/password invalid` });
    } else {
        return callback(null, user);
    }
}

const getUserWithRolebyID = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    })
    return user;
}

const getUserSumCart = async (id: string) => {
    const user = await prisma.cart.findUnique({
        where: { userId: +id },

    })
    return user?.sum ?? 0;
}


export { isEmailExist, registerNewUser, handleLogin, getUserWithRolebyID, getUserSumCart }