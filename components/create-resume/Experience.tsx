import React from 'react'
import InputField from '../forms/InputField'
import RichTextField from '../forms/RichTextField'
import CustomButton from '../CustomButton'
import { FormikProps, FieldArray } from 'formik'
import { ResumeProfileModel } from '@/lib/models/resume/resumemodel'

type Props = {
    formik: FormikProps<ResumeProfileModel>
}

const Experience = ({ formik }: Props) => {
  return (
    <>
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
    </>
  )
}

export default Experience