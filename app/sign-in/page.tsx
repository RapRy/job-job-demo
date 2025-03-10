"use client";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/forms/InputField";
import HorizontalDivider from "@/components/HorizontalDivider";
import Image from "next/image";
import Link from "next/link";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const signInFetch = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/auth/sign-in`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data?.message);
      } else {
        return data.email;
      }
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
    validationSchema: SignInSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      toast.promise(signInFetch(values), {
        loading: "Loading",
        success: (data) => `Authenticated as ${data}`,
        error: (err) => err.toString(),
      });
    },
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-background p-5">
      <div className="bg-white rounded-lg max-w-md min-w-2xs w-full p-8 lg:p-12 shadow-sm">
        <h1 className="custom-heading-1">Sign In</h1>
        <p className="mb-7">
          Need an account? <Link href="/sign-up">Create an account</Link>
        </p>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <InputField label="Email" name="email" type="email" />
            <InputField label="Password" name="password" type="password" />
            <CustomButton
              bgColor="bg-primary-color"
              hoverBgColor="bg-secondary-color"
              text="Sign In"
              type="submit"
              loading={loading}
            />
          </form>
        </FormikProvider>
        <HorizontalDivider text="or Sign In using" />
        <button className="flex justify-center items-center w-xl gap-2 border-background border-solid border rounded-sm mx-auto px-10 py-2">
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
