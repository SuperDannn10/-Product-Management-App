import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutGrid,
  Table as TableIcon,
  Search,
  SlidersHorizontal,
  X,
  AlertCircle
} from 'lucide-react';
import { Product, ViewLayout } from '../types/product';
import { ProductCard } from './ProductCard';
import { ProductTable } from './ProductTable';
import { InventorySummary } from './InventorySummary';

interface ProductCatalogProps {
  products: Product[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onNavigateAdd: () => void;
  initialStockFilter?: 'all' | 'low' | 'instock' | 'out';
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products = [],
  onUpdateQuantity,
  onAddToCart,
  onViewDetails,
  onDeleteProduct,
  onNavigateAdd,
  initialStockFilter = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [layout, setLayout] = useState<ViewLayout>('card');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'instock' | 'out'>(initialStockFilter);

  useEffect(() => {
    if (initialStockFilter) {
      setStockFilter(initialStockFilter);
    }
  }, [initialStockFilter]);

  // Categories extracted safely
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p?.category || 'General'));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Safe filtering logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const cat = p?.category || 'General';
        const name = p?.name || '';
        const desc = p?.description || '';
        const qty = Number(p?.quantity) || 0;

        // Category filter (Requirement 1)
        const matchesCategory =
          selectedCategory === 'All' || cat.toLowerCase() === selectedCategory.toLowerCase();

        // Search query
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          name.toLowerCase().includes(query) ||
          desc.toLowerCase().includes(query) ||
          cat.toLowerCase().includes(query);

        // Stock filter
        const matchesStock =
          stockFilter === 'all'
            ? true
            : stockFilter === 'low'
            ? qty > 0 && qty < 5
            : stockFilter === 'out'
            ? qty === 0
            : qty >= 5;

        return matchesCategory && matchesSearch && matchesStock;
      })
      .sort((a, b) => {
        const priceA = Number(a?.price) || 0;
        const priceB = Number(b?.price) || 0;
        const qtyA = Number(a?.quantity) || 0;
        const qtyB = Number(b?.quantity) || 0;
        const ratingA = Number(a?.rating) || 0;
        const ratingB = Number(b?.rating) || 0;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'qty-low') return qtyA - qtyB;
        if (sortBy === 'qty-high') return qtyB - qtyA;
        if (sortBy === 'subtotal-high') return priceB * qtyB - priceA * qtyA;
        if (sortBy === 'rating') return ratingB - ratingA;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy, stockFilter]);

  const lowStockCount = products.filter(
    (p) => (Number(p?.quantity) || 0) > 0 && (Number(p?.quantity) || 0) < 5
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      {/* 1. Inventory Summary KPI Metrics */}
      <InventorySummary products={products} />

      {/* Low Stock Warning Callout */}
      {lowStockCount > 0 && stockFilter !== 'low' && (
        <div className="mb-6 p-4 bg-amber-50 rounded-3xl border border-amber-300 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900">
                Low Stock Notification: {lowStockCount} product{lowStockCount > 1 ? 's have' : ' has'} less than 5 units left
              </p>
              <p className="text-xs text-amber-700">
                Consider reordering soon to prevent stockouts.
              </p>
            </div>
          </div>
          <button
            onClick={() => setStockFilter('low')}
            className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors"
          >
            Filter Low Stock Items
          </button>
        </div>
      )}

      {/* 2. Controls Bar: Search, Category Filters, Layout Mode */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 mb-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, category, or spec..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Tools: Sort & Layout Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="default">Default Order</option>
                <option value="subtotal-high">Highest Subtotal</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="qty-low">Quantity: Low to High</option>
                <option value="qty-high">Quantity: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Layout Toggle (Cards vs Table) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setLayout('card')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  layout === 'card'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Card Grid Layout"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setLayout('table')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  layout === 'table'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Data Table Layout"
              >
                <TableIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Requirement 1) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider">
            Categories:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            const count =
              cat === 'All'
                ? products.length
                : products.filter(
                    (p) => (p?.category || 'General').toLowerCase() === cat.toLowerCase()
                  ).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
                <span
                  className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {stockFilter !== 'all' && (
            <button
              onClick={() => setStockFilter('all')}
              className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold hover:bg-amber-200 transition-colors flex items-center gap-1 ml-auto"
            >
              Filtering: {stockFilter} stock
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Products List Rendering (.map() array method) */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center text-slate-400 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
            There are no products matching your selected category or search filter.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setStockFilter('all');
              }}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={onNavigateAdd}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl transition-colors"
            >
              Add New Product
            </button>
          </div>
        </div>
      ) : layout === 'card' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdateQuantity={onUpdateQuantity}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          onUpdateQuantity={onUpdateQuantity}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          onDeleteProduct={onDeleteProduct}
        />
      )}

      {/* Catalog Footer Info */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 border-t border-slate-200 pt-4">
        <span>
          Displaying <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> catalog items
        </span>
        <span className="text-slate-400">
          Subtotal = Price × Quantity • Overall Total computed using <code>.reduce()</code>
        </span>
      </div>
    </div>
  );
};
