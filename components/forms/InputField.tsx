import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useField } from "formik";

type Props = {
  type?: string;
  label: string;
  name: string;
  mb?: string
};

const InputField = ({ type, label, name, mb }: Props) => {
  const [field, meta] = useField(name);
  const [fieldType, setFieldType] = React.useState<string>(type ?? "text");

  const changeToTextType = (typeString: string) => setFieldType(typeString);

  return (
    <div className={`flex flex-col gap-y-2 mb-${mb ?? "5"}`}>
      <div className="flex flex-row justify-between">
        <label className="text-sm text-text-color-1 font-normal">{label}</label>
        {type === "password" && (
          <div
            className="flex flex-row gap-x-1 items-center cursor-pointer "
            onClick={() =>
              changeToTextType(fieldType === "text" ? "password" : "text")
            }
          >
            {fieldType === "text" ? (
              <EyeSlashIcon className="size-4 text-primary-color" />
            ) : (
              <EyeIcon className="size-4 text-primary-color" />
            )}
            <span className="text-xs text-primary-color">
              {fieldType === "text" ? "Hide" : "Show"}
            </span>
          </div>
        )}
      </div>
      <input
        type={fieldType ?? "text"}
        className={`bg-white rounded-sm border h-10 px-3 text-text-color-1 font-normal text-sm ${
          meta.error ? "border-warning" : "border-secondary-color"
        }`}
        name={name}
        onChange={field.onChange}
        value={field.value}
      />
      {meta.error && <p className="text-warning text-xs">{meta.error}</p>}
    </div>
  );
};

export default InputField;
