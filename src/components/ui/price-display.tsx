interface PriceDisplayProps {
  amount: string;
  currencyCode?: string;
  compareAtAmount?: string;
  className?: string;
}

export function PriceDisplay({
  amount,
  currencyCode = "INR",
  compareAtAmount,
  className = "",
}: PriceDisplayProps) {
  const formatPrice = (value: string, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  const isOnSale = compareAtAmount && parseFloat(compareAtAmount) > parseFloat(amount);

  return (
    <span className={`inline-flex items-center gap-2 font-primary ${className}`}>
      <span className={`font-medium ${isOnSale ? "text-rose-bronze" : ""}`}>
        {formatPrice(amount, currencyCode)}
      </span>
      {isOnSale && (
        <span className="text-sage-muted line-through text-sm">
          {formatPrice(compareAtAmount, currencyCode)}
        </span>
      )}
    </span>
  );
}
