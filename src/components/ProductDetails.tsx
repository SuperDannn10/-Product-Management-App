import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { Product } from '../types/product';
import { StockBadge } from './StockBadge';
import { StarRating } from './StarRating';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onBack,
  onUpdateQuantity,
  onAddToCart,
}) => {
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [imageError, setImageError] = useState(false);

  const price = Number(product?.price) || 0;
  const quantity = Number(product?.quantity) || 0;
  const computedSubtotal = price * quantity;
  const isOutOfStock = quantity === 0;
  const isLowStock = quantity > 0 && quantity < 5;

  const handleAddToCart = () => {
    if (quantity <= 0) return;
    onAddToCart(product);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const specList = product?.specifications
    ? product.specifications
        .split(/[;\n]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const fallbackImage =
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 fade-in">
      {/* Back Button & Breadcrumbs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-indigo-600 transition-all shadow-xs group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Product Catalog
        </button>

        <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl">
          <span>Catalog</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">{product?.category || 'General'}</span>
          <span>/</span>
          <span className="text-indigo-600 font-bold truncate max-w-[200px]">
            {product?.name}
          </span>
        </div>
      </div>

      {/* Main Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          {/* Left Column: Big Feature Image (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
              <img
                src={imageError || !product?.imageUrl ? fallbackImage : product.imageUrl}
                alt={product?.name || 'Product'}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  isOutOfStock ? 'grayscale opacity-75' : ''
                }`}
              />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 backdrop-blur-md shadow-md border border-slate-200/80">
                  {product?.category || 'General'}
                </span>
                <StockBadge quantity={quantity} />
              </div>
            </div>

            {/* Guarantee / Value Badges */}
            <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-800">1 Year Warranty</span>
                <span className="text-[10px] text-slate-500">Official support</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-200 px-1">
                <Truck className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-800">Express Delivery</span>
                <span className="text-[10px] text-slate-500">Fast shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-800">30-Day Returns</span>
                <span className="text-[10px] text-slate-500">100% money back</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Description & Specifications (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Category, Rating & SKU */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    {product?.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID: {product?.id}
                  </span>
                </div>
                <StarRating rating={product?.rating || 5} size="md" />
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {product?.name}
              </h1>

              {/* Price & Subtotal Block */}
              <div className="p-6 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-slate-50 rounded-2xl border border-indigo-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Unit Price
                  </span>
                  <span className="text-3xl font-black text-slate-900">
                    ${price.toFixed(2)}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Current Subtotal (Price × Quantity)
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-indigo-700">
                    ${computedSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Dedicated Product Description (Field 4) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Product Description
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {product?.description || 'No detailed description available.'}
                </p>
              </div>

              {/* Specifications (Field 5) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  Specifications & Highlights
                </h3>
                {specList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {specList.map((spec, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-xs"
                      >
                        <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                        <span className="font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No specifications listed.</p>
                )}
              </div>
            </div>

            {/* Inventory Stepper & Add to Cart Action */}
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1">
                    Manage Inventory Units
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        disabled={quantity <= 0}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all ${
                          quantity <= 0
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white text-slate-800 shadow-xs hover:bg-slate-50 active:scale-95'
                        }`}
                        title="Decrease stock quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span
                        className={`w-12 text-center font-black text-base ${
                          isOutOfStock
                            ? 'text-rose-600'
                            : isLowStock
                            ? 'text-amber-700'
                            : 'text-slate-900'
                        }`}
                      >
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="w-9 h-9 rounded-xl bg-white text-slate-800 shadow-xs hover:bg-slate-50 active:scale-95 flex items-center justify-center font-bold transition-all"
                        title="Increase stock quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <StockBadge quantity={quantity} />
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="flex-1 sm:max-w-xs">
                  <span className="text-xs font-bold text-slate-700 block mb-1 text-right sm:text-left">
                    Order Action
                  </span>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                      isOutOfStock
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        : isAddedRecently
                        ? 'bg-emerald-600 text-white shadow-emerald-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                    }`}
                  >
                    {isAddedRecently ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart!
                      </>
                    ) : isOutOfStock ? (
                      'Out of Stock'
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Timestamp footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Product ID: {product?.id}
                </span>
                <span>Subtotal automatically recomputes on quantity change</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
