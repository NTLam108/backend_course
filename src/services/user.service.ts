import getConnection from "config/database"
import { prisma } from "config/client"

const handleCreateUser = async (username: string, email: string, address: string) => {

    //insert to database
    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            address: address,
        },
    })
    return newUser;
}



const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
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


const updateUserbyID = async (id: string, username: string, email: string, address: string) => {
    const updateUser = await prisma.user.update({
        where: { id: +id },
        data: {
            username: username,
            email: email,
            address: address,
        },
    })
    return updateUser;
}
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserbyID, updateUserbyID }