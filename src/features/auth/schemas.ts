import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email("Введите корректный email"),
  password: z.string().nonempty("Введите пароль").min(6, "Минимум 6 символов"),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email("Введите корректный email"),
    password: z
      .string()
      .nonempty("Введите пароль")
      .min(6, "Минимум 6 символов"),
    confirm: z
      .string()
      .nonempty("Повторите пароль")
      .min(6, "Минимум 6 символов"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Пароли не совпадают",
    path: ["confirm"],
  })
export type SignupValues = z.infer<typeof signupSchema>
