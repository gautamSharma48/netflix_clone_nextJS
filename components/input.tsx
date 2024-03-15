import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type: string;
}
const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const EyeIcon = showPassword ? FaRegEye : FaRegEyeSlash;
  return (
    <div className="relative ">
      <input
        autoComplete="off"
        id={id}
        onChange={onChange}
        value={value}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder=""
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 apperance-none focus:outline-none focus:ring-0 peer"
      />
      <label
        htmlFor={id}
        className="absolute 
      text-md text-zinc-400
       duration-500 transform 
       -translate-y-3
        scale-75 
        top-4 z-10 origin-[0]
         peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
           peer-focus:scale-75 
           peer-focus:-translate-y-3 left-6"
      >
        {label}
      </label>
      {type === "password" && (
        <div
          onClick={() => setShowPassword((prev) => !prev)}
          className="transition duration-75 absolute right-3 top-4 cursor-pointer"
        >
          <EyeIcon className="text-white" size={20} />
        </div>
      )}
    </div>
  );
};

export default Input;
