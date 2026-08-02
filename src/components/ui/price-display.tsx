interface PriceDisplayProps {
  amount: string;
  currencyCode?: string;
  compareAtAmount?: string;
  className?: string;
}

export function PriceDisplay({
  amount,
  currencyCode = "USD",
  compareAtAmount,
  className = "",
}: PriceDisplayProps) {
  const formatPrice = (value: string, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(parseFloat(value));
  };

  const isOnSale = compareAtAmount && parseFloat(compareAtAmount) > parseFloat(amount);

  return (
    <span className={`inline-flex items-center gap-2 font-primary ${className}`}>
      <span className={`font-medium ${isOnSale ? "text-rose-bronze" : "text-umber"}`}>
        {formatPrice(amount, currencyCode)}
      </span>
      {isOnSale && (
        <span className="text-moonstone line-through text-sm">
          {formatPrice(compareAtAmount, currencyCode)}
        </span>
      )}
    </span>
  );
}
