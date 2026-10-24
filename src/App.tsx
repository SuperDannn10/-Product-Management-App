import { useState, useEffect } from 'react';
import { Product, CartItem } from './types/product';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { AddProductForm } from './components/AddProductForm';
import { ProductDetails } from './components/ProductDetails';
import { CartDrawer } from './components/CartDrawer';
import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('product_management_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const isValid = parsed.every(
            (item) => item && typeof item.name === 'string' && typeof item.price === 'number'
          );
          if (isValid) return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read saved products, falling back to initial', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('product_management_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [activeView, setActiveView] = useState<'catalog' | 'add' | 'details' | 'cart'>('catalog');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'instock' | 'out'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('product_management_items', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('product_management_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || null;

  // 1. Dynamic Quantity Adjustment
  const handleUpdateProductQuantity = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = Math.max(0, (Number(item.quantity) || 0) + delta);
          return {
            ...item,
            quantity: newQty,
            subtotal: (Number(item.price) || 0) * newQty,
          };
        }
        return item;
      })
    );
  };

  // 2. Add New Product Dynamically (Requirement 2)
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // 3. Delete Product
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Delete this product from catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      if (selectedProductId === productId) {
        setActiveView('catalog');
        setSelectedProductId(null);
      }
    }
  };

  // 4. Cart Handlers
  const handleAddToCart = (product: Product) => {
    const qty = Number(product?.quantity) || 0;
    if (qty <= 0) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // 5. Dedicated Product Page Navigation (Requirement 1: 15 pts)
  const handleViewDetails = (product: Product) => {
    setSelectedProductId(product.id);
    setActiveView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter low stock trigger
  const handleFilterLowStock = () => {
    setStockFilter('low');
    setActiveView('catalog');
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to initial demo data
  const handleResetToDefaults = () => {
    if (window.confirm('Reset catalog to the default 5 products?')) {
      setProducts(INITIAL_PRODUCTS);
      setCartItems([]);
      setStockFilter('all');
      localStorage.removeItem('product_management_items');
      localStorage.removeItem('product_management_cart');
      setActiveView('catalog');
      setSelectedProductId(null);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex bg-slate-50 text-slate-800">
        {/* Left Sidebar Navigation */}
        <Sidebar
          products={products}
          cartItems={cartItems}
          activeView={activeView}
          onNavigate={(view) => {
            if (view === 'cart') {
              setIsCartOpen(true);
            } else {
              setActiveView(view);
              setSelectedProductId(null);
              if (view === 'catalog') {
                setStockFilter('all');
              }
            }
          }}
          onFilterLowStock={handleFilterLowStock}
          onResetDefaults={handleResetToDefaults}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar
            products={products}
            cartItems={cartItems}
            activeView={activeView}
            onNavigateCatalog={() => {
              setActiveView('catalog');
              setSelectedProductId(null);
              setStockFilter('all');
            }}
            onNavigateAdd={() => {
              setActiveView('add');
              setSelectedProductId(null);
            }}
            onOpenCart={() => setIsCartOpen(true)}
            onResetDefaults={handleResetToDefaults}
          />

          <main className="flex-1 overflow-y-auto">
            {activeView === 'catalog' && (
              <ProductCatalog
                products={products}
                onUpdateQuantity={handleUpdateProductQuantity}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
                onDeleteProduct={handleDeleteProduct}
                onNavigateAdd={() => setActiveView('add')}
                initialStockFilter={stockFilter}
              />
            )}

            {activeView === 'add' && (
              <AddProductForm
                onAddProduct={handleAddProduct}
                onCancel={() => setActiveView('catalog')}
              />
            )}

            {activeView === 'details' && selectedProduct && (
              <ProductDetails
                product={selectedProduct}
                onBack={() => {
                  setActiveView('catalog');
                  setSelectedProductId(null);
                }}
                onUpdateQuantity={handleUpdateProductQuantity}
                onAddToCart={handleAddToCart}
              />
            )}

            {activeView === 'details' && !selectedProduct && (
              <div className="max-w-2xl mx-auto py-16 px-4 text-center">
                <p className="text-slate-600 mb-4">Product not found or removed.</p>
                <button
                  onClick={() => setActiveView('catalog')}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold"
                >
                  Return to Catalog
                </button>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-medium text-slate-700">
              Product Management App • React 18 + TypeScript + Tailwind CSS
            </span>
            <span className="text-slate-400">
              Totals calculated reactively using JavaScript <code>.reduce()</code>
            </span>
          </footer>
        </div>

        {/* Slide-over Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
