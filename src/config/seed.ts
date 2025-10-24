import { prisma } from "config/client"
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền",
                },
                {
                    name: "USER",
                    description: "User bình thường",
                },
            ]
        })
    }
    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456")
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        })
        await prisma.user.createMany({
            data: [
                {
                    fullname: "Trọng Lâm",
                    username: "lam.nt108204@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole.id
                },
                {
                    fullname: "Admin",
                    username: "admin@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.GOOGLE,
                    roleId: adminRole.id
                },
            ]
        })
    }
    if (countRole !== 0 && countUser !== 0) {
        console.log(">>>>already init data");
    }
}

export default initDatabase

