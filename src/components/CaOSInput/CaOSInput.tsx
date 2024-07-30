import { InputText } from "primereact/inputtext";
import React from "react";

const CaOSInput = ({ label, helperText }: any) => {
  return (
    <div className="card flex justify-content-center">
      <div className="flex flex-column gap-2">
        <label htmlFor={label}>{label}</label>
        <InputText id={label} aria-describedby={`${label}-help`} />
        <small id={`${label}-help`}>{helperText}</small>
      </div>
    </div>
  );
};

export default CaOSInput;
