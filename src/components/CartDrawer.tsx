import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/product';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateCartQuantity: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateCartQuantity,
  onRemoveFromCart,
  onClearCart,
}) => {
  if (!isOpen) return null;

  // Requirement 3: Use .reduce() to compute overall cart total
  const cartTotal = cartItems.reduce((acc, item) => {
    const price = Number(item?.product?.price) || 0;
    const qty = Number(item?.quantity) || 0;
    return acc + price * qty;
  }, 0);

  const totalItemCount = cartItems.reduce((acc, item) => {
    return acc + (Number(item?.quantity) || 0);
  }, 0);

  const fallbackImage =
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=200&q=80';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Shopping Cart</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {totalItemCount} {totalItemCount === 1 ? 'unit' : 'units'} in bag
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Add some products from the catalog to start building your order.
                </p>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => {
                const price = Number(product?.price) || 0;
                const qty = Number(quantity) || 0;
                const itemSubtotal = price * qty;

                return (
                  <div
                    key={product.id}
                    className="flex gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 items-center justify-between shadow-xs"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                      <img
                        src={product?.imageUrl || fallbackImage}
                        alt={product?.name || 'Item'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = fallbackImage;
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {product?.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        ${price.toFixed(2)} each
                      </p>
                      <div className="text-xs font-black text-indigo-700 mt-0.5">
                        Subtotal: ${itemSubtotal.toFixed(2)}
                      </div>
                    </div>

                    {/* Stepper & Trash */}
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center bg-white rounded-lg border border-slate-300 p-0.5 shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateCartQuantity(product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateCartQuantity(product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(product.id)}
                        className="text-slate-400 hover:text-rose-600 text-xs transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Cart Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Standard Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Cart Overall Total</span>
                  <span className="text-indigo-600 text-lg">
                    ${cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClearCart}
                  className="px-4 py-3 text-xs font-bold rounded-2xl text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Checkout simulated successfully! Total processed: $${cartTotal.toFixed(2)}`);
                    onClearCart();
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
