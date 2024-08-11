import React from "react";
import { Button } from "primereact/button";

interface CaOSButtonProps {
  label: string | any;
  size?: "small" | "medium" | "large";
  type?: "primary" | "secondary";
  buttonType?: "button" | "submit" | "reset";
  [x: string]: any;
}

export const CaOSButton: React.FC<CaOSButtonProps> = ({ label, size = "small", type = "primary", buttonType = "button", ...props }) => {
  const baseColors = {
    primary: {
      color: "#FFFFFF",
      backgroundColor: "#0F0F44",
      borderColor: "#AAAAAA",
      hoverBackgroundColor: "#FFFFFF",
      hoverColor: "#9047C9",
    },
    secondary: {
      color: "#000000",
      backgroundColor: "#f8f9fa",
      borderColor: "#f8f9fa",
      hoverBackgroundColor: "#000000",
      hoverColor: "#9047C9",
    },
  };

  const colors = baseColors[type || "primary"];

  const buttonStyles: React.CSSProperties = {
    color: colors.color,
    backgroundColor: colors.backgroundColor,
    borderColor: colors.borderColor,
    borderRadius: "8px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    fontSize: size === "small" ? "12px" : size === "large" ? "18px" : "14px",
    padding: size === "small" ? "6px 12px" : size === "large" ? "12px 24px" : "10px 16px",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = colors.hoverBackgroundColor;
    target.style.color = colors.hoverColor;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = colors.backgroundColor;
    target.style.color = colors.color;
  };

  return <Button {...props} label={label} type={buttonType} style={buttonStyles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
};
