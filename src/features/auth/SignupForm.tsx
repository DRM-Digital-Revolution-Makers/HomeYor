import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupValues } from "./schemas";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signupUser } from "./authSlice";
import { useNavigate } from "@tanstack/react-router";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={`w-full bg-[#0F1530] border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-white/20 ${
      className || ""
    }`}
  />
));
Input.displayName = "Input";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => (
  <button
    {...rest}
    className="w-full bg-white/10 hover:bg-white/20 transition rounded-xl px-3 py-2 text-sm"
  >
    {children}
  </button>
);

export default function SignupForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, access, refresh } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (values: SignupValues) => {
    dispatch(signupUser({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      navigate({ to: "/" });
    }
  }, [access, refresh, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] mx-auto p-6 bg-surface rounded-2xl shadow-soft space-y-3 fixed top-[30%] left-[37%]"
    >
      <div className="text-lg font-semibold">Регистрация</div>

      <div>
        <label className="text-sm text-gray-300">Email</label>
        <Input placeholder="email@example.com" {...register("email")} />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-300">Пароль</label>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-300">Подтверждение пароля</label>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("confirm")}
        />
        {errors.confirm && (
          <p className="text-xs text-red-400 mt-1">{errors.confirm.message}</p>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <Button disabled={loading}>{loading ? "Регистрируем…" : "Зарегистрироваться"}</Button>

      <div className="text-xs text-gray-400 text-center mt-2">
        Уже есть аккаунт?{' '}
        <button
          type="button"
          className="underline"
          onClick={() => navigate({ to: "/login" })}
        >
          Войти
        </button>
      </div>
    </form>
  );
}