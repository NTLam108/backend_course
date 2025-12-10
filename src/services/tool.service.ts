import { prisma } from "config/client"

// id       Int     @id @default(autoincrement())
//   name     String? @db.VarChar(255)
//   descTool String  @db.MediumText
//   price    Int
//   quantity Int
//   status   String  @db.VarChar(100)
//   imgTool  String? @db.VarChar(255)
const handleCreateTool = async (
    name: string,
    price: number,
    quantity: number,
    status: string,
    descTool: string,
    imgTool: string
) => {
    const newTool = await prisma.carTool.create({
        data: {
            name: name,
            price: price,
            quantity: quantity,
            status: status,
            descTool: descTool,
            imgTool: imgTool
        }
    })
    return newTool;
}

const getAllTool = async () => {
    const tools = await prisma.carTool.findMany();
    return tools;
}

const handleDeleteTool = async (id: string) => {
    await prisma.carTool.delete({
        where: {
            id: +id
        }
    })
}

const handleViewTool = async (id: string) => {
    const tool = await prisma.carTool.findUnique({
        where: {
            id: +id
        }
    })
    return tool;
}

const handleUpdateTool = async (
    id: string,
    name: string,
    price: number,
    status: string,
    quantity: number,
    descTool: string,
    imgTool: string
) => {
    const updateTool = await prisma.carTool.update({
        where: {
            id: +id
        },
        data: {
            name: name,
            price: price,
            status: status,
            quantity: quantity,
            descTool: descTool,
            ...(imgTool !== undefined && { imgTool: imgTool }),
        }
    })
    return updateTool;
}
export { handleCreateTool, getAllTool, handleDeleteTool, handleViewTool, handleUpdateTool }