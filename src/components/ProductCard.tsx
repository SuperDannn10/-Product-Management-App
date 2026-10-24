import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Eye, Check, ExternalLink } from 'lucide-react';
import { Product } from '../types/product';
import { StockBadge } from './StockBadge';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
  onUpdateQuantity: (id: string, delta: number) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onUpdateQuantity,
  onAddToCart,
  onViewDetails,
}) => {
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [imageError, setImageError] = useState(false);

  const price = Number(product?.price) || 0;
  const quantity = Number(product?.quantity) || 0;
  // Requirement 3: Compute subtotal = price * quantity
  const computedSubtotal = price * quantity;

  const isLowStock = quantity > 0 && quantity < 5;
  const isOutOfStock = quantity === 0;

  const handleAddToCart = () => {
    if (quantity <= 0) return;
    onAddToCart(product);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1400);
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
        isOutOfStock
          ? 'border-rose-200/80 bg-rose-50/10'
          : isLowStock
          ? 'border-amber-300 ring-2 ring-amber-300/40 shadow-sm'
          : 'border-slate-200 shadow-sm hover:border-indigo-300'
      }`}
    >
      {/* 1. Feature Image with Overlay Actions */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={imageError || !product?.imageUrl ? fallbackImage : product.imageUrl}
          alt={product?.name || 'Product'}
          onError={() => setImageError(true)}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isOutOfStock ? 'grayscale opacity-60' : ''
          }`}
          loading="lazy"
        />

        {/* Top Floating Category and Stock Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 backdrop-blur-md shadow-sm border border-slate-200/80">
            {product?.category || 'General'}
          </span>
          <StockBadge quantity={quantity} />
        </div>

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-slate-900/90 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-sm border border-white/20">
            <Eye className="w-4 h-4" />
            View Dedicated Page
          </span>
        </div>
      </div>

      {/* 2. Product Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between mb-2">
            <StarRating rating={product?.rating || 5} />
            <span className="text-[10px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              SKU: {(product?.id || 'prod').slice(-6)}
            </span>
          </div>

          {/* Product Name (Field 2) */}
          <h4
            onClick={() => onViewDetails(product)}
            className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
            title={product?.name}
          >
            {product?.name || 'Untitled Product'}
          </h4>

          {/* Description Snippet */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product?.description || 'No description provided.'}
          </p>
        </div>

        {/* 3. Pricing, Subtotal, and Stepper Controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          {/* Price & Subtotal */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                Unit Price
              </span>
              <span className="text-lg font-black text-slate-900">
                ${price.toFixed(2)}
              </span>
            </div>

            {/* Field 5: Subtotal = Price * Quantity */}
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                Subtotal
              </span>
              <span className="text-base font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200 inline-block">
                ${computedSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Quantity Controls (Requirement: Buttons to add/remove quantity) */}
          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-600 ml-1">
              Quantity:
            </span>

            <div className="flex items-center gap-2">
              {/* Decrease button */}
              <button
                type="button"
                onClick={() => onUpdateQuantity(product.id, -1)}
                disabled={quantity <= 0}
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                  quantity <= 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-800 border border-slate-300 shadow-xs hover:bg-slate-100 active:scale-95'
                }`}
                title="Decrease quantity by 1"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Quantity indicator with conditional style */}
              <span
                className={`w-8 text-center font-black text-sm ${
                  isOutOfStock
                    ? 'text-rose-600'
                    : isLowStock
                    ? 'text-amber-700'
                    : 'text-slate-900'
                }`}
              >
                {quantity}
              </span>

              {/* Increase button */}
              <button
                type="button"
                onClick={() => onUpdateQuantity(product.id, 1)}
                className="w-7 h-7 rounded-xl bg-white text-slate-800 border border-slate-300 shadow-xs hover:bg-slate-100 active:scale-95 flex items-center justify-center transition-all"
                title="Increase quantity by 1"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons: View Details & Add to Cart with conditional rendering */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onViewDetails(product)}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Details
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                isOutOfStock
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                  : isAddedRecently
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
              }`}
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added!
                </>
              ) : isOutOfStock ? (
                'Sold Out'
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
