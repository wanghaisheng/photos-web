import clsx from "clsx";
import React, { forwardRef } from "react";

export type InputFieldProps = {
  label?: string;
  error?: string;
  type?: "text" | "password" | "email";
  textarea?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, error, type = "text", className, textarea, required, ...rest },
    ref
  ) => {
    const inputClass = "border border-zinc-300 p-2";
    return (
      <div className={clsx("flex flex-col w-full relative", className)}>
        <label className="text-xs mb-1">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
        {textarea ? (
          <textarea
            className={clsx("min-h-[50px]", inputClass)}
            {...rest}
            // @ts-ignore
            ref={ref}
          />
        ) : (
          <input type={type} className={inputClass} {...rest} ref={ref} />
        )}
        {error ? (
          <span
            className="text-red-400 text-xs absolute left-0 top-[calc(100%_+_5px)] truncate max-w-full"
            role="alert"
            title={error}
          >
            {error}
          </span>
        ) : null}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export default InputField;