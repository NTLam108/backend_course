import * as z from "zod";

const toolSchema = z.object({
    name: z.string().trim().min(1, { message: "Tên không được để trống" }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1"
        }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số lượng còn lại tối thiểu là 1"
        }),
    status: z.string().trim().min(1, { message: "Status không được để trống" }),
    descTool: z.string().trim().min(1, { message: "Thông tin phụ kiện không được để trống" }),
});

export type TtoolSchema = z.infer<typeof toolSchema>;

export { toolSchema }