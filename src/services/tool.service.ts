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
    imgTool: string,
    suitable_for: string
) => {
    const newTool = await prisma.carTool.create({
        data: {
            name: name,
            price: price,
            quantity: quantity,
            status: status,
            descTool: descTool,
            imgTool: imgTool,
            suitable_for: suitable_for
        }
    })
    return newTool;
}

const getAllTool = async (sortBy: string = 'featured') => {
    let orderBy: any = {};
    if (sortBy === 'priceLowToHigh') {
        orderBy = { price: 'asc' };
    } else if (sortBy === 'priceHighToLow') {
        orderBy = { price: 'desc' };
    } else {
        orderBy = { id: 'desc' };
    }

    const tools = await prisma.carTool.findMany({
        orderBy
    });
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