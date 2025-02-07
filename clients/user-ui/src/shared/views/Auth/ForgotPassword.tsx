import styles from "@/src/utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../../../graphql/actions/forgot-password.action";
import toast from "react-hot-toast";

const fromSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof fromSchema>;

const ForgotPassword = ({
  setActivateState,
}: {
  setActivateState: (e: string) => void;
}) => {
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(fromSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      await forgotPassword({
        variables: {
          email: data.email,
        },
      });
      toast.success("Please check your email to reset your password");
      reset();
    } catch (error: unknown) {
      const typedError = error as { message: string };
      toast.error(typedError.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Forgot your password?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {errors.email.message}
          </span>
        )}
        <br />
        <br />
        <input
          type="submit"
          value="submit"
          disabled={isSubmitting || loading}
          className={`${styles.button} mt-3`}
        />
        <br />
        <h5 className="text-center pt-4 font-Poppins text-sm">
          Or Go Back to
          <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setActivateState("Login")}>
            Login
          </span>
        </h5>
      </form>
    </div>
  );
};

export default ForgotPassword;
