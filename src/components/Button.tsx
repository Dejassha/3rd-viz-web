"use client";

import { forwardRef } from "react";

const sizeClasses = {
  small: "px-5 py-1.5 text-sm",
  medium: "px-8 py-2.5 text-base",
  large: "px-10 py-3 text-lg",
} as const;

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary/90",
  white: "bg-white text-primary hover:bg-white/90 border border-primary/10",
  outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
} as const;

export type ButtonSize = keyof typeof sizeClasses;
export type ButtonVariant = keyof typeof variantClasses;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    size = "medium",
    variant = "white",
    className = "",
    fullWidth = false,
    type = "button",
    disabled = false,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={[
        "rounded-full font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
