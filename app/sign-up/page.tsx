"use client";
import Link from "next/link";
import InputField from "@/components/forms/InputField";
import CustomButton from "@/components/CustomButton";
import HorizontalDivider from "@/components/HorizontalDivider";
import Image from "next/image";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useState } from "react";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Required."),
  password: Yup.string().required("Required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required."),
});

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const signUpFetch = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
    isGoogle: boolean;
  }) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/auth/sign-up`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );

      const { message } = await res.json();

      if (res.status !== 200) {
        throw new Error(message);
      } else {
        return message;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    validationSchema: SignUpSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      toast.promise(signUpFetch({ ...values, isGoogle: false }), {
        loading: "Loading",
        success: (data) => {
          resetForm({
            values: { email: "", password: "", confirmPassword: "" },
          });
          return `${data}`;
        },
        error: (err) => err.toString(),
      });
    },
  });

  const signUpGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        console.log(tokenResponse);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/auth/google`,
          {
            method: "POST",
            body: JSON.stringify({ code: tokenResponse }),
          }
        );

        const data = await res.json();

        toast.promise(
          signUpFetch({
            confirmPassword: "",
            password: "",
            email: data.email,
            isGoogle: true,
          }),
          {
            loading: "Loading",
            success: (data) => `${data}`,
            error: (err) => err.toString(),
          }
        );
      } catch {
      } finally {
        setLoading(false);
      }
    },
    flow: "auth-code",
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-background p-5">
      <div className="bg-white rounded-lg max-w-md min-w-2xs w-full p-8 lg:p-12 shadow-sm">
        <h1 className="custom-heading-1">Sign Up</h1>
        <p className="mb-7">
          Already have an account?{" "}
          <Link href="/sign-in">Login your account</Link>
        </p>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <InputField label="Email" name="email" type="email" />
            <InputField label="Password" name="password" type="password" />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <CustomButton
              bgColor="bg-primary-color"
              hoverBgColor="bg-secondary-color"
              text="Create"
              type="submit"
              loading={loading}
            />
          </form>
        </FormikProvider>
        <HorizontalDivider text="or Sign Up using" />
        <button
          className={`flex justify-center items-center w-xl gap-2 border-background border-solid border rounded-sm mx-auto px-10 py-2`}
          onClick={loading ? () => {} : () => signUpGoogle()}
        >
          <Image
            src="/google-logo.png"
            width={30}
            height={30}
            alt="google logo"
          />
          <span className="font-bold text-sm">Google</span>
        </button>
      </div>
    </div>
  );
}
