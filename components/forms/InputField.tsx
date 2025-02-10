import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useField } from "formik";

type Props = {
  type?: string;
  label: string;
  name: string;
};

const InputField = ({ type, label, name }: Props) => {
  const [field, meta, helpers] = useField(name);
  console.log(field);
  console.log(meta);
  console.log(helpers);

  return (
    <div className="flex flex-col gap-y-2 mb-5">
      <div className="flex flex-row justify-between">
        <label className="text-sm text-text-color-1 font-normal">{label}</label>
        {type === "password" && (
          <div className="flex flex-row gap-x-1 items-center cursor-pointer ">
            <EyeIcon className="size-4 text-primary-color" />
            <span className="text-xs text-primary-color">Show</span>
          </div>
        )}
      </div>
      <input
        type={type ?? "text"}
        className="bg-white rounded-sm border border-secondary-color h-10 px-3 text-text-color-1 font-normal text-sm"
        name={name}
        onChange={field.onChange}
      />
    </div>
  );
};

export default InputField;
