import React from "react";
import { useField } from "formik";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

type Props = {
  name: string;
  label?: string;
  isRead?: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldError: (field: string, message: string | undefined) => void;
  mb?: string
};

const RichTextField = ({
  name,
  label,
  isRead = false,
  setFieldError,
  setFieldValue,
  mb
}: Props) => {
  const [field, meta] = useField(name);
  const handleTextChange = (html: string) => {
    setFieldValue(name, html);
    setFieldError(name, "");
  };

  const modules = {
    toolbar: {
      container: `#${label?.replaceAll(" ", "-").toLowerCase()}-container`
    }
  }

  return (
    <div
      className={`flex flex-col gap-y-2 mb-${mb ?? "5"} quill-custom ${
        meta.error ? "quill-custom-error" : ""
      }`}
    >
      <label className="text-sm text-text-color-1 font-normal">{label}</label>
      <div id={`${label?.replaceAll(" ", "-").toLowerCase()}-container`} />
      <ReactQuill
        theme="snow"
        value={field.value}
        placeholder=""
        onChange={isRead ? () => {} : handleTextChange}
        readOnly={isRead}
        modules={modules}
      />
      {meta.error && <p className="text-warning text-xs">{meta.error}</p>}
    </div>
  );
};

export default RichTextField;
