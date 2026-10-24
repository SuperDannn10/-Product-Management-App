import React, { useState } from 'react';
import {
  PlusCircle,
  Image as ImageIcon,
  DollarSign,
  Hash,
  Star,
  Layers,
  FileText,
  Tag,
  AlertCircle,
  CheckCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Product, ProductFormData, FormErrors } from '../types/product';
import { PRESET_CATEGORIES, SAMPLE_IMAGE_PRESETS } from '../data/initialProducts';

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
  onCancel: () => void;
}

const INITIAL_FORM: ProductFormData = {
  name: '',
  category: '',
  description: '',
  specifications: '',
  rating: '4.8',
  price: '',
  quantity: '10',
  imageUrl: '',
};

export const AddProductForm: React.FC<AddProductFormProps> = ({
  onAddProduct,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'imageUrl') {
      setPreviewError(false);
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectPresetImage = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
    setPreviewError(false);
    if (errors.imageUrl) {
      setErrors((prev) => ({ ...prev, imageUrl: undefined }));
    }
  };

  // Requirement: Validate that all fields are filled before submission (5 pts)
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Feature Image URL
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Feature image URL is required';
    }

    // 2. Product Name
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Product name must be at least 2 characters';
    }

    // 3. Category
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required (select or enter)';
    }

    // 4. Description
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 8) {
      newErrors.description = 'Description should be at least 8 characters';
    }

    // 5. Specification
    if (!formData.specifications.trim()) {
      newErrors.specifications = 'Product specifications are required';
    }

    // 6. Rating
    const numRating = parseFloat(formData.rating);
    if (!formData.rating || isNaN(numRating) || numRating < 1 || numRating > 5) {
      newErrors.rating = 'Rating must be a number between 1.0 and 5.0';
    }

    // 7. Price
    const numPrice = parseFloat(formData.price);
    if (!formData.price || isNaN(numPrice) || numPrice <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    // 8. Quantity
    const numQty = parseInt(formData.quantity, 10);
    if (formData.quantity === '' || isNaN(numQty) || numQty < 0) {
      newErrors.quantity = 'Quantity must be a valid non-negative integer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const priceNum = parseFloat(formData.price);
    const qtyNum = parseInt(formData.quantity, 10);

    // Requirement 2: Dynamically add new product
    // Requirement 3: Subtotal = price * quantity
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      specifications: formData.specifications.trim(),
      rating: parseFloat(formData.rating),
      price: priceNum,
      quantity: qtyNum,
      imageUrl: formData.imageUrl.trim(),
      subtotal: priceNum * qtyNum,
      createdAt: new Date().toISOString(),
    };

    onAddProduct(newProduct);
    setIsSubmitted(true);
    setFormData(INITIAL_FORM);

    setTimeout(() => {
      onCancel();
    }, 1200);
  };

  const previewPrice = parseFloat(formData.price) || 0;
  const previewQty = parseInt(formData.quantity, 10) || 0;
  const computedSubtotalPreview = previewPrice * previewQty;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 fade-in">
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel & Return to Catalog
        </button>
        <span className="text-xs text-slate-500 font-medium">
          * All 8 fields are validated before submission
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 text-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Add New Product</h2>
              <p className="text-xs sm:text-sm text-indigo-100 mt-0.5">
                Provide details for the new catalog item. Subtotals and overall totals will compute automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Success Confirmation */}
        {isSubmitted && (
          <div className="p-4 bg-emerald-50 border-b border-emerald-200 flex items-center gap-3 text-emerald-800">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-sm font-bold">
              Product successfully added! Returning to catalog...
            </span>
          </div>
        )}

        {/* Error Notification Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="p-4 bg-rose-50 border-b border-rose-200 flex items-start gap-3 text-rose-800">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Validation incomplete: Please fill all fields:</p>
              <p className="text-xs text-rose-700 mt-0.5">
                {Object.values(errors).filter(Boolean).join(' • ')}
              </p>
            </div>
          </div>
        )}

        {/* Form Inputs (8 Required Fields) */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field 1: Feature Image URL */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                1. Feature Image URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.imageUrl
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {errors.imageUrl && (
                <p className="text-xs text-rose-600 font-bold">{errors.imageUrl}</p>
              )}

              {/* Sample Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mr-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Quick Image Presets:
                </span>
                {SAMPLE_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSelectPresetImage(preset.url)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium transition-colors border border-slate-200"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Live Preview */}
              {formData.imageUrl && (
                <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex-shrink-0">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      onError={() => setPreviewError(true)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Live Image Preview
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {previewError ? '⚠️ Image failed to load, check the link' : 'Image loaded successfully'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Field 2: Product Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-indigo-600" />
                2. Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sony WH-1000XM5 Noise Canceling"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-rose-600 font-bold">{errors.name}</p>
              )}
            </div>

            {/* Field 3: Product Category */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                3. Product Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white transition-all focus:outline-none focus:ring-2 ${
                  errors.category
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              >
                <option value="">-- Select category --</option>
                {PRESET_CATEGORIES.filter((c) => c !== 'All Categories').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="Smart Home">Smart Home</option>
                <option value="Gaming">Gaming</option>
                <option value="Photography">Photography</option>
              </select>
              {errors.category && (
                <p className="text-xs text-rose-600 font-bold">{errors.category}</p>
              )}
            </div>

            {/* Field 4: Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                4. Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Comprehensive description of product features, build materials, and benefits..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.description
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-rose-600 font-bold">{errors.description}</p>
              )}
            </div>

            {/* Field 5: Specification */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                5. Product Specifications (separated by semicolons ';') <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                placeholder="e.g. 30h Battery life; Bluetooth 5.3; LDAC support; USB-C fast charge"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.specifications
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {errors.specifications && (
                <p className="text-xs text-rose-600 font-bold">{errors.specifications}</p>
              )}
            </div>

            {/* Field 6: Rating (1-5) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 text-indigo-600" />
                6. Rating (1.0 to 5.0) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="4.8"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.rating
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {errors.rating && (
                <p className="text-xs text-rose-600 font-bold">{errors.rating}</p>
              )}
            </div>

            {/* Field 7: Price */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-indigo-600" />
                7. Unit Price ($) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="299.99"
                  className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.price
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-xs text-rose-600 font-bold">{errors.price}</p>
              )}
            </div>

            {/* Field 8: Quantity */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-indigo-600" />
                8. Initial Quantity <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="10"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.quantity
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {errors.quantity && (
                <p className="text-xs text-rose-600 font-bold">{errors.quantity}</p>
              )}
              {parseInt(formData.quantity, 10) < 5 && formData.quantity !== '' && (
                <p className="text-xs text-amber-600 font-bold">
                  ⚠️ Quantities under 5 will trigger the &ldquo;Low Stock&rdquo; highlight badge.
                </p>
              )}
            </div>

            {/* Dynamic Subtotal Computation Box */}
            <div className="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 flex flex-col justify-center">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                Computed Subtotal (Price × Quantity)
              </span>
              <div className="text-2xl font-black text-indigo-700 mt-1">
                ${computedSubtotalPreview.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-indigo-600 mt-0.5">
                Automatically added to the overall inventory value upon submission.
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Product Dynamically
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
