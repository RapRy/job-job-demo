import React from "react";

type Props = {
  bgColor: string;
  hoverBgColor: string;
  textColor?: string;
  text: string;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
};

const CustomButton = ({
  bgColor,
  hoverBgColor,
  text,
  textColor = "text-white",
  type = "button",
  loading,
}: Props) => {
  return (
    <button
      type={type}
      className={`${
        loading ? "bg-foreground" : bgColor
      } hover:${hoverBgColor} px-6 py-2.5 rounded-sm text-sm ${textColor} font-bold`}
      disabled={loading ?? false}
    >
      {text}
    </button>
  );
};

export default CustomButton;
