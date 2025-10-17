import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("Введите имя").min(3, "Минимум 3 символа"),
  password: z.string().nonempty("Введите пароль").min(6, "Минимум 6 символов"),
});
export type LoginValues = z.infer<typeof loginSchema>;
