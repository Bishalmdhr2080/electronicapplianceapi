import z from "zod";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
} from "../../constants/order.js";

const addressSchema = z.object({
  city: z.string({ required_error: "city is required" }),
  province: z.string({ required_error: "province is required o" }),
  country: z.string().optional(),
});

const orderSchema = z.object({
  orderItems: z.array(
    z.object({
      product: z.string({ required_error: "Product is require" }),
      quantity: z.number().min(1).optional(),
    }),
  ),
  totalPrice: z.number({ required_error: "Total Price is Required" }).min(0),
  
  shippingAddress: addressSchema,
});
const orderStatusSchema = z.object({
  status: z.enum([
    ORDER_STATUS_PENDING,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_SHIPPED,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_CANCELLED,
  ]),
});

export { orderSchema, orderStatusSchema };
