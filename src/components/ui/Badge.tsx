import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export default function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default" && "bg-gray-100 text-gray-800",
        variant === "success" && "bg-green-100 text-green-800",
        variant === "warning" && "bg-yellow-100 text-yellow-800",
        variant === "danger" && "bg-red-100 text-red-800",
        variant === "info" && "bg-blue-100 text-blue-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
