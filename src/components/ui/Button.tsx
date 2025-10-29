import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "outline" && "border border-gray-300 hover:bg-gray-100",
          variant === "ghost" && "hover:bg-gray-100",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
