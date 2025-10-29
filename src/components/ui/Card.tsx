import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-lg border bg-white shadow-sm", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
