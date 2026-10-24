import React from 'react';
import {
  Package,
  PlusCircle,
  ShoppingBag,
  LayoutGrid,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { Product, CartItem } from '../types/product';

interface SidebarProps {
  products: Product[];
  cartItems: CartItem[];
  activeView: 'catalog' | 'add' | 'details' | 'cart';
  onNavigate: (view: 'catalog' | 'add' | 'cart') => void;
  onFilterLowStock: () => void;
  onResetDefaults: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  products = [],
  cartItems = [],
  activeView,
  onNavigate,
  onFilterLowStock,
  onResetDefaults,
}) => {
  // Requirement 3: Use .reduce() to calculate overall catalog value
  const overallTotalValue = products.reduce((acc, p) => {
    return acc + (Number(p?.price) || 0) * (Number(p?.quantity) || 0);
  }, 0);

  const cartUnits = cartItems.reduce((acc, item) => {
    return acc + (Number(item?.quantity) || 0);
  }, 0);

  const lowStockCount = products.filter(
    (p) => (Number(p?.quantity) || 0) > 0 && (Number(p?.quantity) || 0) < 5
  ).length;

  return (
    <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col justify-between p-5 border-r border-slate-800 shadow-xl hidden md:flex">
      {/* Top Branding */}
      <div>
        <div
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-3 cursor-pointer select-none group pb-6 border-b border-slate-800/80"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                ProductPulse
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Product & Inventory Hub
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-1.5">
          <button
            onClick={() => onNavigate('catalog')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeView === 'catalog' || activeView === 'details'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-4 h-4" />
              <span>Products Catalog</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeView === 'catalog' || activeView === 'details'
                  ? 'bg-indigo-700/80 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {products.length}
            </span>
          </button>

          <button
            onClick={() => onNavigate('add')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeView === 'add'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Add New Product</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              New
            </span>
          </button>

          <button
            onClick={() => onNavigate('cart')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeView === 'cart'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Shopping Cart</span>
            </div>
            {cartUnits > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-900 font-black animate-pulse">
                {cartUnits}
              </span>
            )}
          </button>

          <button
            onClick={onFilterLowStock}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Low Stock Alerts</span>
            </div>
            {lowStockCount > 0 ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                {lowStockCount}
              </span>
            ) : (
              <span className="text-[10px] text-slate-500">0</span>
            )}
          </button>
        </nav>
      </div>

      {/* Bottom Summary Pill & Reset */}
      <div className="space-y-4 pt-6 border-t border-slate-800/80">
        {/* Total Catalog Value Badge */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/60 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Catalog Valuation
            </span>
            <Layers className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="text-xl font-black text-white tracking-tight">
            ${overallTotalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-indigo-300/80 mt-1">
            Computed dynamically via <code>.reduce()</code>
          </p>
        </div>

        {/* Reset Demo Data Button */}
        <button
          type="button"
          onClick={onResetDefaults}
          className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors border border-slate-800"
          title="Reset to 5 default demo products"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>
      </div>
    </aside>
  );
};

