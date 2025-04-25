import * as React from "react";
import { cls } from "@/lib/utils";
// import AttentionIcon from "@/public/images/Attention_Icon.svg";
// import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: Function;
  required?: boolean;
  name?: string;
  error?: string;
  classes?: any;
  type?: string;
  autoComplete?: string;
  errorMessage?: string | any;
  icon?: any;
  no_symbol?: boolean;
  startIcon?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      register,
      required,
      name,
      error,
      type,
      classes,
      autoComplete,
      errorMessage,
      icon,
      no_symbol,
      startIcon,
      ...rest
    },
    _ref
  ) => {
    return (
      <div className={cls("mb-0", className)}>
        {no_symbol ? (
          <p className="font-normal text-[#344054]">{label}</p>
        ) : (
          <p className="font-semibold font-clash px-3">
            {label}
            {required && (
              <span className="text-[#DD514D] font-medium text-xs">*</span>
            )}
          </p>
        )}
        <div
          className={cls(
            "relative my-1 flex w-full flex-row items-center",
            className
          )}
        >
          {startIcon && (
            <div className="absolute bottom-[30%] left-5">{startIcon}</div>
          )}
          <input
            type={type ? type : "text"}
            className={cls(
              `${startIcon ? "px-[2.7rem]" : "px-3"}  py-2 text-[#667085]`,
              `w-[100%] border-b ${
                errorMessage ? "border-b-[#DD514D]" : "border-b-neutral200"
              } bg-transparent outline-none placeholder:text-[#667085] text-sm focus:outline-none focus:bg-none`,
              `${classes}`
            )}
            {...rest}
            {...register?.(name, { required })}
            autoComplete={"off"}
          />
          <div className="absolute bottom-[25%] right-5 cursor-pointer">
            {icon}
          </div>
        </div>

        {/* <LineIcon
            style={{ width: "12.5px", height: "12.5px", color: "#141414" }}
            name="spinner"
          /> */}
        {errorMessage && (
          <div className="flex items-center gap-2 mt-2">
            <p className="text-[12px] text-[#FF0000] text-capitalize">
              {errorMessage}
            </p>
            {/* <Image src={AttentionIcon} alt="AttentionIcon" /> */}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
