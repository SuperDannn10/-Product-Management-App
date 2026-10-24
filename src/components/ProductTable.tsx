import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Eye, Trash2, Check } from 'lucide-react';
import { Product } from '../types/product';
import { StockBadge } from './StockBadge';
import { StarRating } from './StarRating';

interface ProductTableProps {
  products: Product[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onDeleteProduct?: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products = [],
  onUpdateQuantity,
  onAddToCart,
  onViewDetails,
  onDeleteProduct,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    const qty = Number(product?.quantity) || 0;
    if (qty <= 0) return;
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-4">Product</th>
              <th className="py-4 px-3">Category</th>
              <th className="py-4 px-3">Rating</th>
              <th className="py-4 px-3 text-right">Price</th>
              <th className="py-4 px-4 text-center">Quantity</th>
              <th className="py-4 px-4 text-right">Subtotal</th>
              <th className="py-4 px-3 text-center">Stock Level</th>
              <th className="py-4 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const price = Number(product?.price) || 0;
              const quantity = Number(product?.quantity) || 0;
              const subtotal = price * quantity;
              const isLowStock = quantity > 0 && quantity < 5;
              const isOutOfStock = quantity === 0;

              return (
                <tr
                  key={product.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isLowStock
                      ? 'bg-amber-50/40'
                      : isOutOfStock
                      ? 'bg-rose-50/20'
                      : ''
                  }`}
                >
                  {/* Image & Title */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => onViewDetails(product)}
                        className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 cursor-pointer group shadow-xs"
                      >
                        <img
                          src={product?.imageUrl || fallbackImage}
                          alt={product?.name || 'Product'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = fallbackImage;
                          }}
                        />
                      </div>
                      <div className="max-w-xs">
                        <p
                          onClick={() => onViewDetails(product)}
                          className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-1 transition-colors"
                          title={product?.name}
                        >
                          {product?.name || 'Untitled Product'}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {product?.description || 'No description provided.'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3">
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {product?.category || 'General'}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <StarRating rating={product?.rating || 5} />
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-3 text-right font-black text-slate-900 whitespace-nowrap">
                    ${price.toFixed(2)}
                  </td>

                  {/* Quantity Stepper */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        disabled={quantity <= 0}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                          quantity <= 0
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 active:scale-95 shadow-xs'
                        }`}
                        title="Reduce quantity by 1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span
                        className={`w-8 text-center text-sm font-black ${
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
                        className="w-7 h-7 rounded-lg bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 active:scale-95 shadow-xs flex items-center justify-center transition-all"
                        title="Increase quantity by 1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Subtotal */}
                  <td className="py-3.5 px-4 text-right font-black text-indigo-700 whitespace-nowrap">
                    ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Stock Status Badge */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <StockBadge quantity={quantity} />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewDetails(product)}
                        className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-slate-200"
                        title="View Dedicated Page"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        disabled={isOutOfStock}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-xs ${
                          isOutOfStock
                            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                            : addedId === product.id
                            ? 'bg-emerald-600 text-white shadow-emerald-200'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                        }`}
                        title={isOutOfStock ? 'Item out of stock' : 'Add 1 unit to Cart'}
                      >
                        {addedId === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Add
                          </>
                        )}
                      </button>

                      {onDeleteProduct && (
                        <button
                          type="button"
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
