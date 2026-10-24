import React from 'react';
import { DollarSign, Layers, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';
import { Product } from '../types/product';

interface InventorySummaryProps {
  products: Product[];
}

export const InventorySummary: React.FC<InventorySummaryProps> = ({ products = [] }) => {
  // Requirement 3: JavaScript array method .reduce() to compute overall total of all subtotals
  const overallTotalValue = products.reduce((acc, product) => {
    const price = Number(product?.price) || 0;
    const qty = Number(product?.quantity) || 0;
    return acc + price * qty;
  }, 0);

  const totalQuantityUnits = products.reduce((acc, product) => {
    return acc + (Number(product?.quantity) || 0);
  }, 0);

  const lowStockCount = products.filter(
    (p) => (Number(p?.quantity) || 0) > 0 && (Number(p?.quantity) || 0) < 5
  ).length;

  const outOfStockCount = products.filter(
    (p) => (Number(p?.quantity) || 0) === 0
  ).length;

  const uniqueCategoriesCount = new Set(
    products.map((p) => p?.category || 'General')
  ).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Overall Total Value Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white rounded-3xl p-6 shadow-xl shadow-indigo-500/10 border border-indigo-400/30 group hover:shadow-indigo-500/20 transition-all">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            Overall Total Value
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-md border border-white/20">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="text-3xl font-black tracking-tight text-white">
          ${overallTotalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-xs text-indigo-200/90 mt-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          Sum of all product subtotals (.reduce)
        </p>
      </div>

      {/* 2. Total Catalog Products */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Products
          </span>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Layers className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {products.length}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            In <strong>{uniqueCategoriesCount}</strong> product {uniqueCategoriesCount === 1 ? 'category' : 'categories'}
          </p>
        </div>
      </div>

      {/* 3. Total Inventory Units */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total In-Stock Units
          </span>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {totalQuantityUnits.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Combined stock across all items
          </p>
        </div>
      </div>

      {/* 4. Low Stock Status Alert */}
      <div className={`rounded-3xl p-6 shadow-sm border transition-all flex flex-col justify-between ${
        lowStockCount > 0
          ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-200/50'
          : 'bg-white border-slate-200/80'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Stock Alerts
          </span>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
            lowStockCount > 0
              ? 'bg-amber-100 text-amber-700 border-amber-200'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className={`text-3xl font-black tracking-tight ${
            lowStockCount > 0 ? 'text-amber-700' : 'text-slate-900'
          }`}>
            {lowStockCount}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {lowStockCount > 0
              ? `${lowStockCount} items have quantity < 5`
              : outOfStockCount > 0
              ? `${outOfStockCount} items out of stock`
              : 'All items comfortably stocked'}
          </p>
        </div>
      </div>
    </div>
  );
};
