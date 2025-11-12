import getConnection from "config/database"
import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}

const comparePassword = async (plainText: string, hashPassword: string) => {
    return bcrypt.compare(plainText, hashPassword)
}
const handleCreateUser = async (
    username: string,
    password: string,
    fullname: string,
    address: string,
    phone: string,
    accountType: string,
    avatar: string,
    role: string) => {

    const defaultPassword = await hashPassword("123456");

    //insert to database
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: defaultPassword,
            fullname: fullname,
            address: address,
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            roleId: +role,
        },
    })
    return newUser;
}



const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getAllRole = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

const handleDeleteUser = async (id: string) => {
    const deleteUser = await prisma.user.delete({
        where: { id: +id }
    })
}

const getUserbyID = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id }
    })
    return user;
}


const updateUserbyID = async (
    id: string,
    fullname: string,
    phone: string,
    address: string,
    role: string,
    avatar: string) => {
    const updateUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullname: fullname,
            address: address,
            phone: phone,
            roleId: +role,
            ...(avatar !== undefined && { avatar: avatar })
        },
    })
    return updateUser;
}
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserbyID, updateUserbyID, getAllRole, hashPassword, comparePassword }