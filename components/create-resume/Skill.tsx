import React, { useState } from 'react'
import _ from 'lodash'
import CustomButton from '../CustomButton'
import SelectField from '../forms/SelectField'
import { FormikProps, FieldArray } from 'formik'
import { ResumeProfileBaseModel } from '@/lib/models/resume/resumemodel'

const optionSkill = [{
    value: "1",
    label: "test1"
},{
    value: "2",
    label: "test2"
}]

type Props = {
    formik: FormikProps<ResumeProfileBaseModel>
}

const Skill = ({formik}: Props) => {
    const [skill, setSkill] = useState<string | null>("")
    const [rating, setRating] = useState<string | null>("")

    const handleChange = (value: string, name?: string) => name?.toLowerCase() === "rating" ? setRating(value) : setSkill(value)

    const handleAddValue = () => {
        const formikValue = formik.values.skill

        const skillLabel = optionSkill.find(item => item.value === skill)?.label
        const rateLabel = optionSkill.find(item => item.value === rating)?.label

        formik.setFieldValue("skill", (_.isEmpty(formikValue[0].name)) ? [{
            id: "1", name: skillLabel, rate: rateLabel, skillId: skill, rateId: rating
        }] : [...formikValue, {
            id: formikValue[formikValue.length - 1].id + 1,
            name: skillLabel, rate: rateLabel, skillId: skill, rateId: rating
        }], false)

        setSkill("")
        setRating("")
    }

  return (
    <>
        <div className="col-start-1 col-end-3">
            <h2>Skill</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 col-start-1 col-end-3">
                <SelectField
                    name="select"
                    label="Skill Name"
                    options={optionSkill}
                    customHandler={handleChange}
                    customValue={skill}
                    defaultOption='Select Skill'
                />
                <div className='flex flex-row items-end gap-4'>
                    <div className="w-[150px]">
                        <SelectField
                        name="select"
                        label="Rating"
                        options={optionSkill}
                        customHandler={handleChange}
                        customValue={rating}
                        defaultOption='Select Rate'
                        />
                    </div>
                    <div className="w-50px">
                        <CustomButton
                            bgColor="bg-info"
                            hoverBgColor="bg-info"
                            text="Add"
                            customFn={handleAddValue}
                            disabled={_.isEmpty(rating) || _.isEmpty(skill)}
                        />
                    </div>
                </div>
            </div>
            {formik.errors.skill && 
            <div className='grid grid-cols-2 gap-4'>
                <p className="text-warning text-xs">Please add at least 1 skill</p>
            </div>
            }
            {
                !_.isEmpty(formik.values.skill[0]?.name) &&
                    <div className='grid grid-cols-2 gap-4 mt-2'>
                        {
                            <FieldArray name="skill" 
                                render={arrayHelpers => (
                                    formik.values.skill.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <p>{`${item.name} (${item.rate})`}</p>
                                            <CustomButton
                                                bgColor="bg-warning"
                                                hoverBgColor="bg-warning"
                                                text="Remove"
                                                customFn={() => formik.values.skill.length > 1 ? arrayHelpers.remove(index) : arrayHelpers.replace(index, {
                                                    id: "",
                                                    name: "",
                                                    skillId: "",
                                                    rate: "",
                                                    rateId: "",
                                                })}
                                                
                                            />
                                        </React.Fragment>
                                    ))
                                )}
                            />
                        }
                    </div>
            }
    </>
  )
}

export default Skill