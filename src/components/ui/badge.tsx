type BadgeVariant = "new" | "sale" | "sold-out";

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-gilt text-champagne",
  sale: "bg-rose-bronze text-champagne",
  "sold-out": "bg-moonstone text-umber",
};

const variantLabels: Record<BadgeVariant, string> = {
  new: "New",
  sale: "Sale",
  "sold-out": "Sold Out",
};

export function Badge({ variant, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-block rounded-full px-2.5 py-0.5
        text-xs font-medium uppercase tracking-widest font-primary
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {variantLabels[variant]}
    </span>
  );
}
