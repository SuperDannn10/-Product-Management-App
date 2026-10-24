import React from 'react';
import {
  Package,
  PlusCircle,
  ShoppingBag,
  LayoutGrid,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Product, CartItem } from '../types/product';

interface NavbarProps {
  products: Product[];
  cartItems: CartItem[];
  activeView: 'catalog' | 'add' | 'details' | 'cart';
  onNavigateCatalog: () => void;
  onNavigateAdd: () => void;
  onOpenCart: () => void;
  onResetDefaults: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  products = [],
  cartItems = [],
  activeView,
  onNavigateCatalog,
  onNavigateAdd,
  onOpenCart,
  onResetDefaults,
}) => {
  const overallTotalValue = products.reduce((acc, p) => {
    return acc + (Number(p?.price) || 0) * (Number(p?.quantity) || 0);
  }, 0);

  const cartUnits = cartItems.reduce((acc, item) => {
    return acc + (Number(item?.quantity) || 0);
  }, 0);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Mobile Logo (visible on small screens when sidebar is hidden) */}
        <div className="flex items-center gap-3 md:hidden">
          <div
            onClick={onNavigateCatalog}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Package className="w-4 h-4" />
            </div>
            <span className="font-black text-slate-900 text-base">ProductPulse</span>
          </div>
        </div>

        {/* Desktop Breadcrumb / Title */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-900 font-bold capitalize">
              {activeView === 'details' ? 'Product Details' : activeView}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <div className="flex items-center gap-1.5 text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Total Valuation: ${overallTotalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Catalog Tab */}
          <button
            onClick={onNavigateCatalog}
            className={`md:hidden p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'catalog'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Catalog</span>
          </button>

          {/* Add Product Button */}
          <button
            onClick={onNavigateAdd}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 shadow-xs active:scale-95 ${
              activeView === 'add'
                ? 'bg-indigo-700 text-white shadow-indigo-300 ring-2 ring-indigo-400'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </button>

          {/* Cart Button with Count Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all shadow-xs"
            title="Open Shopping Cart"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-slate-700" />
            {cartUnits > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartUnits > 99 ? '99+' : cartUnits}
              </span>
            )}
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetDefaults}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors shadow-xs"
            title="Reset to 5 default demo products"
            aria-label="Reset Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
