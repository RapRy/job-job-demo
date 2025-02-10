import React from "react";

type Props = {
  bgColor: string;
  hoverBgColor: string;
  textColor?: string;
  text: string;
  type?: "submit" | "reset" | "button";
};

const CustomButton = ({
  bgColor,
  hoverBgColor,
  text,
  textColor = "text-white",
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      className={`${bgColor} hover:${hoverBgColor} px-6 py-2.5 rounded-sm text-sm ${textColor} font-bold`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
