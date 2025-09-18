"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import _ from 'lodash'
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import Profile from "@/components/create-resume/Profile";
import Experience from "@/components/create-resume/Experience";
import Skill from "@/components/create-resume/Skill";
import Education from "@/components/create-resume/Education";
import Certificate from "@/components/create-resume/Certificate";
import CustomButton from "@/components/CustomButton";
import { ResumeProfileBaseModel } from "@/lib/models/resume/resumemodel";
import { useBoundStore } from "@/store/store";
import toast from "react-hot-toast";
import { UserCredModel } from "@/lib/models/users/usermodel";

const resumeSchema = Yup.object().shape({
  firstName: Yup.string().required("Required."),
  lastName: Yup.string().required("Required."),
  about: Yup.string().test("tags-error", "Required", (value) => !(value === "<p><br></p>")),
  experience: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      companyName: Yup.string().required("Required"),
      position: Yup.string().required("Required"),
      startDate: Yup.date().required("Required"),
      endDate: Yup.date(),
      description: Yup.string(),
      isPresent: Yup.boolean()
    })
  ),
  skill: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      name: Yup.string().required("Required"),
      rate: Yup.string().required("Required"),
    })
  ),
  education: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      schoolName: Yup.string().required("Required"),
      degree: Yup.string().required("Required"),
      startDate: Yup.date().required("Required"),
      endDate: Yup.date(),
      description: Yup.string(),
      isPresent: Yup.boolean()
    })
  ),
  certificate: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      name: Yup.string(),
      organization: Yup.string(),
      date: Yup.date(),
      description: Yup.string(),
    })
  )
  // file: Yup.mixed<File>().required("Required").test('fileFormat', 'Only PDF files are allowed.', (value) => {
  //   if(value.name){
  //     const supFormat = ['pdf']
  //     const nameToArray = value.name.split(".").pop()
  //       return supFormat.includes(nameToArray as string);

  //   }

  //   return true
  // }).test('fileSize', 'File size must be less than 3MB', (value) => {
  //   if(value.size){
  //     return value.size <= 3000000;
  //   }

  //   return true
  // })
});

export default function CreateResume() {
  const route = useRouter();
  const { user, setUser } = useBoundStore()
  const [loading, setLoading] = useState<boolean>(false)

  const createResumeFetch = async (values: ResumeProfileBaseModel) => {
    try {
      setLoading(true)
      const finalData: ResumeProfileBaseModel = {
        ...values,
        experience: values.experience.map(item => ({
          ...item, isPresent: !_.isEmpty(item.endDate)
        })),
        education: values.education.map(item => ({
          ...item, isPresent: !_.isEmpty(item.endDate),
        }))
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/resume/create`, {
        method: "POST", body: JSON.stringify(finalData)
      })

      const { message } = await res.json();

      if (res.status !== 200) {
        throw new Error(message);
      } else {
        const updateUser:UserCredModel = {
          ...user!,
          name: {
            first: finalData.firstName,
            last: finalData.lastName,
          },
          is_resume_created: true
        }
        setUser(updateUser)
        return message;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      }
    }finally{
      setLoading(false)
    }
  }

  const formik = useFormik({
    validationSchema: resumeSchema,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      about: "",
      experience: [
        {
          id: "",
          companyName: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          isPresent: false,
        },
      ],
      skill: [
        {
          id: "",
          name: "",
          skillId: "",
          rate: "",
          rateId: "",
        },
      ],
      education: [
        {
          id: "",
          schoolName: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
          isPresent: false,
        },
      ],
      certificate: [
        {
          id: "",
          name: "",
          organization: "",
          date: "",
          description: "",
        },
      ],
      // file: null
    },
    onSubmit: async (value) => {
      const finalData: ResumeProfileBaseModel = {
        ...value,
        certificate: value.certificate.filter(item => !_.isEmpty(item.name))
      }

      toast.promise(createResumeFetch({
        ...finalData,
        userId: user?._id ?? ""
      }), 
      { 
        loading: "Processing your Resume", 
        success: data => {
          return data
        },
        error: err => err.toString() 
      }).then(() => {
        console.log(user?.name.first.toLowerCase().replaceAll(" ", "-"))
        route.push(`/${finalData.firstName.toLowerCase().replaceAll(" ", "-")}`)
      })
      
      
    },
  });

  return (
    <div className="h-100 w-screen flex justify-center items-center bg-background">
      <div className="bg-white max-w-4xl min-w-2xs w-full h-full py-8 lg:py-12">
        <div className="px-8 pb-8">
          <h1 className="custom-heading-1">Create your Resume</h1>
          <p>
            Integer ullamcorper justo tortor id vestibulum tortor molestie ac.
          </p>
        </div>
        <hr />
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="px-8">
              <div className="grid grid-cols-3 gap-4 mb-8 mt-6">
                <Profile formik={formik} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Experience formik={formik} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Skill formik={formik} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Education formik={formik} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Certificate formik={formik} />
              </div> 
            </div>
            <hr />
            <div className="px-8 pt-8">
              <CustomButton
                  bgColor="bg-success"
                  hoverBgColor="bg-success"
                  text="Submit"
                  loading={loading}
                  type="submit"
              />
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}
