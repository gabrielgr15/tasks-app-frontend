import React from "react";
import clsx from "clsx";
{}

export default function Button({children, className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className= {clsx(
                "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full",
                className
    )}
            {...props}
            >
            {children}
        </button>
    )
}