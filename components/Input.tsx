import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        className
      )}
      {...props}
    />
  );
}