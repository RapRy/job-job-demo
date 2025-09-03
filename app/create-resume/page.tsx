"use client";
import React from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import Profile from "@/components/create-resume/Profile";
import Experience from "@/components/create-resume/Experience";
import Skill from "@/components/create-resume/Skill";
import Education from "@/components/create-resume/Education";
import Certificate from "@/components/create-resume/Certificate";

const resumeSchema = Yup.object().shape({
  firstName: Yup.string().required("Required."),
  lastName: Yup.string().required("Required."),
  about: Yup.string(),
  experience: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      companyName: Yup.string().required("Required"),
      position: Yup.string().required("Required"),
      startDate: Yup.date().required("Required"),
      endDate: Yup.date(),
      description: Yup.string(),
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
    })
  ),
  certificate: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      name: Yup.string().required("Required"),
      organization: Yup.string().required("Required"),
      date: Yup.date().required("Required"),
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
  const formik = useFormik({
    validationSchema: resumeSchema,
    validateOnBlur: false,
    validateOnChange: false,
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
    onSubmit: (value) => {
      console.log(value);
    },
  });

  return (
    <div className="h-100 w-screen flex justify-center items-center bg-background">
      <div className="bg-white max-w-4xl min-w-2xs w-full h-full p-8 lg:p-12">
        <h1>Create your Resume</h1>
        <p>
          Integer ullamcorper justo tortor id vestibulum tortor molestie ac.
        </p>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Profile formik={formik} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Experience formik={formik} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Skill formik={formik} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Education formik={formik} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Certificate formik={formik} />
            </div> 
            <button type="submit">Submit and log</button>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}
