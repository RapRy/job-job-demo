"use client";
import React from "react";
import InputField from "@/components/forms/InputField";
import RichTextField from "@/components/forms/RichTextField";
import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";
import SelectField from "@/components/forms/SelectField";

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
      rate: Yup.number().required("Required"),
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
          rate: "",
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
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <div className="bg-white max-w-4xl min-w-2xs w-full h-full p-8 lg:p-12">
        <h1>Create your Resume</h1>
        <p>
          Integer ullamcorper justo tortor id vestibulum tortor molestie ac.
        </p>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <InputField label="First Name" name="firstName" mb="0" />
              <InputField label="Last Name" name="lastName" mb="0" />
              <div className="col-start-1 col-end-4">
                <RichTextField
                  name="about"
                  label="About"
                  setFieldError={formik.setFieldError}
                  setFieldValue={formik.setFieldValue}
                  mb="0"
                />
              </div>

              {/* <input type="file" name="file" accept="*" onChange={formik.handleChange} />
              <p>{ formik.errors.file }</p>  */}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-start-1 col-end-3">
                <h2>Experience</h2>
              </div>
              <FieldArray
                name="experience"
                render={(arrayHelpers) =>
                  formik.values.experience &&
                  formik.values.experience.map((exp, ind) => (
                    <React.Fragment key={ind}>
                      <InputField
                        label="Company Name"
                        name={`experience.${ind}.companyName`}
                        mb="0"
                      />
                      <InputField
                        label="Position"
                        name={`experience.${ind}.position`}
                        mb="0"
                      />
                      <InputField
                        label="Start Date"
                        name={`experience.${ind}.startDate`}
                        mb="0"
                        type="date"
                      />
                      <InputField
                        label="End Date"
                        name={`experience.${ind}.endDate`}
                        mb="0"
                        type="date"
                      />
                      <div className="col-start-1 col-end-3">
                        <RichTextField
                          name={`experience.${ind}.description`}
                          label="Description"
                          setFieldError={formik.setFieldError}
                          setFieldValue={formik.setFieldValue}
                          mb="0"
                        />
                      </div>
                      <div className="col-start-1 col-end-3">
                        <div className="flex flex-row gap-4">
                          {formik.values.experience.length > 1 && (
                            <CustomButton
                              bgColor="bg-warning"
                              hoverBgColor="bg-warning"
                              text="Remove"
                              customFn={() => arrayHelpers.remove(ind)}
                            />
                          )}
                          {formik.values.experience.length - 1 === ind && (
                            <CustomButton
                              bgColor="bg-info"
                              hoverBgColor="bg-info"
                              text="Add"
                              customFn={() =>
                                arrayHelpers.insert(ind, {
                                  id: "",
                                  companyName: "",
                                  position: "",
                                  startDate: "",
                                  endDate: "",
                                  description: "",
                                })
                              }
                            />
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-start-1 col-end-3">
                <h2>Skill</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 col-start-1 col-end-3">
                <SelectField
                  name="select"
                  label="Skill Name"
                  options={[
                    {
                      value: 1,
                      label: "test",
                    },
                  ]}
                />
                <div className="w-[100px]">
                  <SelectField
                    name="select"
                    label="Rating"
                    options={[
                      {
                        value: 1,
                        label: "test",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-start-1 col-end-3">
                <h2>Education</h2>
              </div>
              <FieldArray
                name="education"
                render={(arrayHelpers) =>
                  formik.values.education &&
                  formik.values.education.map((exp, ind) => (
                    <React.Fragment key={ind}>
                      <InputField
                        label="School Name"
                        name={`education.${ind}.schoolName`}
                        mb="0"
                      />
                      <SelectField
                        name={`education.${ind}.degree`}
                        label="Degree"
                        options={[
                          {
                            value: 1,
                            label: "test",
                          },
                        ]}
                      />
                      <InputField
                        label="Start Date"
                        name={`education.${ind}.startDate`}
                        mb="0"
                        type="date"
                      />
                      <InputField
                        label="End Date"
                        name={`education.${ind}.endDate`}
                        mb="0"
                        type="date"
                      />
                      <div className="col-start-1 col-end-3">
                        <RichTextField
                          name={`education.${ind}.description`}
                          label="Description"
                          setFieldError={formik.setFieldError}
                          setFieldValue={formik.setFieldValue}
                          mb="0"
                        />
                      </div>
                      <div className="col-start-1 col-end-3">
                        <div className="flex flex-row gap-4">
                          {formik.values.education.length > 1 && (
                            <CustomButton
                              bgColor="bg-warning"
                              hoverBgColor="bg-warning"
                              text="Remove"
                              customFn={() => arrayHelpers.remove(ind)}
                            />
                          )}
                          {formik.values.education.length - 1 === ind && (
                            <CustomButton
                              bgColor="bg-info"
                              hoverBgColor="bg-info"
                              text="Add"
                              customFn={() =>
                                arrayHelpers.insert(ind, {
                                  id: "",
                                  companyName: "",
                                  position: "",
                                  startDate: "",
                                  endDate: "",
                                  description: "",
                                })
                              }
                            />
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-start-1 col-end-3">
                <h2>Certicates / Trainings</h2>
              </div>
              <FieldArray
                name="certificate"
                render={(arrayHelpers) =>
                  formik.values.certificate &&
                  formik.values.certificate.map((exp, ind) => (
                    <React.Fragment key={ind}>
                      <InputField
                        label="Name"
                        name={`certificate.${ind}.name`}
                        mb="0"
                      />
                        <InputField
                        label="Issuing Organization"
                        name={`certificate.${ind}.organization`}
                        mb="0"
                      />
                      <InputField
                        label="Issuing Date"
                        name={`certificate.${ind}.date`}
                        mb="0"
                        type="date"
                      />
                      <div className="col-start-1 col-end-3">
                        <RichTextField
                          name={`certificate.${ind}.description`}
                          label="Description"
                          setFieldError={formik.setFieldError}
                          setFieldValue={formik.setFieldValue}
                          mb="0"
                        />
                      </div>
                      <div className="col-start-1 col-end-3">
                        <div className="flex flex-row gap-4">
                          {formik.values.certificate.length > 1 && (
                            <CustomButton
                              bgColor="bg-warning"
                              hoverBgColor="bg-warning"
                              text="Remove"
                              customFn={() => arrayHelpers.remove(ind)}
                            />
                          )}
                          {formik.values.certificate.length - 1 === ind && (
                            <CustomButton
                              bgColor="bg-info"
                              hoverBgColor="bg-info"
                              text="Add"
                              customFn={() =>
                                arrayHelpers.insert(ind, {
                                  id: "",
                                  name: "",
                                  organization: "",
                                  date: "",
                                  description: "",
                                })
                              }
                            />
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                }
              />
            </div>
            <button type="submit">Submit and log</button>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}
