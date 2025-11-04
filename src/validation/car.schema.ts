import * as z from "zod";

const CarSchema = z.object({
    name: z.string().trim().min(1, { message: "Tên không được để trống" }),
    priceperday: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1"
        }),
    detailCar: z.string().trim().min(1, { message: "Thông tin xe không được để trống" }),
    carType: z.string().trim().min(1, { message: "Loại xe không được để trống" }),
    seat: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số chỗ ngồi tối thiểu là 1"
        }),
    brand: z.string().trim().min(1, { message: "Brand không được để trống" }),
    engine: z.string().trim().min(1, { message: "Engine không được để trống" }),
    status: z.string().trim().min(1, { message: "Status không được để trống" }),

});
export type TCarSchema = z.infer<typeof CarSchema>;

export { CarSchema }