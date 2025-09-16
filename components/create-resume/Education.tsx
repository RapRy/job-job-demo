import React from 'react'
import InputField from '../forms/InputField'
import RichTextField from '../forms/RichTextField'
import CustomButton from '../CustomButton'
import { FormikProps, FieldArray } from 'formik'
import { ResumeProfileBaseModel } from '@/lib/models/resume/resumemodel'

type Props = {
    formik: FormikProps<ResumeProfileBaseModel>
}

const Education = ({ formik }: Props) => {
  return (
    <>
        <div className="col-start-1 col-end-3">
                <h2 className='custom-heading-2'>Education</h2>
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
                      <InputField
                        name={`education.${ind}.degree`}
                        label="Degree"
                        mb='0'
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
                                  schoolName: "",
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
    </>
  )
}

export default Education