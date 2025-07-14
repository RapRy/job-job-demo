"use client";
import InputField from "@/components/forms/InputField";
import RichTextField from "@/components/forms/RichTextField";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

const resumeSchema = Yup.object().shape({
  firstName: Yup.string().required("Required."),
  lastName: Yup.string().required("Required."),
  about: Yup.string(),
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
      // file: null
    },
    onSubmit: (value) => {
      console.log(value)
    },
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <div className="bg-white max-w-4xl min-w-2xs w-full h-full p-8 lg:p-12">
        <h1>Create your Resume</h1>
        <p>
          Integer ullamcorper justo tortor id vestibulum tortor molestie ac.
        </p>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <InputField label="First Name" name="firstName" />
              <InputField label="Last Name" name="lastName" />
              <div className="col-start-1 col-end-4">
                <RichTextField
                  name="about"
                  label="About"
                  setFieldError={formik.setFieldError}
                  setFieldValue={formik.setFieldValue}
                />
              </div>
              {/* <input type="file" name="file" accept="*" onChange={formik.handleChange} />
              <p>{ formik.errors.file }</p> */}
            </div>
            <button type="submit">Submit and log</button>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}
