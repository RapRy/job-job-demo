import React from "react";
import { useField } from "formik";

export interface SelectOptionModel {
  value: string | number;
  label: string;
}

type Props = {
  label: string;
  name: string;
  options: [SelectOptionModel];
  mb?: string;
};

const SelectField = ({ label, name, options, mb }: Props) => {
  const [field, meta] = useField(name);
  return (
    <div className={`flex flex-col gap-y-2 mb-${mb ?? "5"}`}>
      <label className="text-sm text-text-color-1 font-normal">{label}</label>
      <select
        name={name}
        className={`bg-white rounded-sm border h-10 px-3 text-text-color-1 font-normal text-sm ${
          meta.error ? "border-warning" : "border-secondary-color"
        }`}
      >
        <option value="">Select Skills</option>
        {options.map((opt, ind) => (
          <option key={ind} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
