import React from 'react'
import InputField from '../forms/InputField'
import RichTextField from '../forms/RichTextField'
import { FormikProps } from 'formik'
import { ResumeProfileBaseModel } from '@/lib/models/resume/resumemodel'

type Props = {
    formik: FormikProps<ResumeProfileBaseModel>
}

const Profile = ({ formik }: Props) => {
  return (
    <>
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
    </>
  )
}

export default Profile