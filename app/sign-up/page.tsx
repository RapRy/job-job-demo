import Link from "next/link"
import InputField from "@/components/forms/InputField"
import CustomButton from "@/components/CustomButton"
import HorizontalDivider from "@/components/HorizontalDivider"
import Image from "next/image"

export default function SignUp(){
    return <div className="h-screen w-screen flex justify-center items-center bg-background p-5">
        <div className="bg-white rounded-lg max-w-md min-w-2xs w-full p-8 lg:p-12 shadow-sm">
        <h1 className="custom-heading-1">Sign Up</h1>
        <p className="mb-7">Already have an account? <Link href="/sign-in">Login your account</Link></p>
        <InputField label="Email" name="email" type="email" />
        <InputField label="Password" name="password" type="password" />
        <InputField label="Confirm Password" name="confirm-password" type="password" />
        <CustomButton bgColor="bg-primary-color" hoverBgColor="bg-secondary-color" text="Create" />
        <HorizontalDivider text="or Sign Up using" />
        <button className="flex justify-center items-center w-xl gap-2 border-background border-solid border rounded-sm mx-auto px-10 py-2">
            <Image src="/google-logo.png" width={30} height={30} alt="google logo" />
            <span className="font-bold text-sm">Google</span>
        </button>
        </div>
    </div>
}