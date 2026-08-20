import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-charcoal text-sage-canvas hover:bg-charcoal/90 border border-charcoal",
  outline:
    "bg-transparent text-charcoal border border-charcoal/30 hover:border-charcoal hover:bg-charcoal/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-9 px-5 text-[11px]",
  lg: "h-11 px-7 text-[12px]",
};

export function Button({
  variant = "outline",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full uppercase tracking-[0.15em] font-primary font-medium
        transition-all duration-200 ease-out
        disabled:opacity-40 disabled:pointer-events-none
        cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
