import React from 'react'
import InputField from '../forms/InputField'
import RichTextField from '../forms/RichTextField'
import CustomButton from '../CustomButton'
import { FormikProps, FieldArray } from 'formik'
import { ResumeProfileBaseModel } from '@/lib/models/resume/resumemodel'

type Props = {
    formik: FormikProps<ResumeProfileBaseModel>
}

const Certificate = ({ formik }: Props) => {
  return (
    <>
        <div className="col-start-1 col-end-3">
                <h2 className='custom-heading-2'>Certicates / Trainings</h2>
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
    </>
  )
}

export default Certificate