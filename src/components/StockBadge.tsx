import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface StockBadgeProps {
  quantity?: number;
  className?: string;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ quantity = 0, className = '' }) => {
  const qty = Number(quantity) || 0;

  // Requirement: Conditional formatting (Low Stock if quantity < 5)
  if (qty === 0) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs ${className}`}
        title="Product is currently out of stock"
      >
        <XCircle className="w-3.5 h-3.5 text-rose-500" />
        Out of Stock
      </span>
    );
  }

  if (qty < 5) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs ring-1 ring-amber-300/40 ${className}`}
        title="Low stock: less than 5 units left in inventory"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
        Low Stock ({qty} left)
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs ${className}`}
      title="Sufficient stock available"
    >
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      In Stock ({qty})
    </span>
  );
};
