import React, { useEffect } from "react";
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
  mb?: string;
};

const RichTextField = ({
  name,
  label,
  isRead = false,
  setFieldError,
  setFieldValue,
  mb,
}: Props) => {
  const [field, meta] = useField(name);
  const handleTextChange = (html: string) => {
    setFieldValue(name, html);
    setFieldError(name, "");
  };


  const modules = {
    toolbar: {
      // container: `#${label?.replaceAll(" ", "-").toLowerCase()}-container`,
      container: `#${name?.replaceAll(".", "-").toLowerCase()}`,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    // "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  return (
    <div
      className={`flex flex-col gap-y-2 mb-${mb ?? "5"} quill-custom ${
        meta.error ? "quill-custom-error" : ""
      }`}
    >
      <label className="text-sm text-text-color-1 font-normal">{label}</label>
      <div
        // id={`${label?.replaceAll(" ", "-").toLowerCase()}-container`}
        id={name?.replaceAll(".", "-").toLowerCase()}
        className="ql-toolbar ql-snow"
      >
        {/* <span className="ql-formats">
          <select className="ql-header" defaultValue="3">
            <option value="1">Heading</option>
            <option value="2">Subheading</option>
            <option value="3">Normal</option>
          </select>
        </span>
        <select className="ql-size" defaultValue="medium">
          <option value="extra-small">Size 1</option>
          <option value="small">Size 2</option>
          <option value="medium">Size 3</option>
          <option value="large">Size 4</option>
        </select> */}
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
          {/* <button className="ql-script" value="super" /> */}
          {/* <button className="ql-script" value="sub" /> */}
          <button className="ql-blockquote" />
          {/* <button className="ql-direction" /> */}
        </span>
        <span className="ql-formats">
          <select className="ql-align" />
          <select className="ql-color" />
          {/* <select className="ql-background" /> */}
        </span>
        <span className="ql-formats">
          <button className="ql-link" />
          {/* <button className="ql-image" /> */}
          {/* <button className="ql-video" /> */}
        </span>
        <span className="ql-formats">
          {/* <button className="ql-formula" /> */}
          {/* <button className="ql-code-block" /> */}
          {/* <button className="ql-clean" /> */}
        </span>
      </div>
      <ReactQuill
        theme="snow"
        value={field.value}
        placeholder=""
        onChange={isRead ? () => {} : handleTextChange}
        readOnly={isRead}
        modules={modules}
        formats={formats}
      />
      {meta.error && <p className="text-warning text-xs">{meta.error}</p>}
    </div>
  );
};

export default RichTextField;
