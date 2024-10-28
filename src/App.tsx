import { useState, useEffect } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api/products";
import { ProductForm } from "./components/ProductForm";
import { ProductCard } from "./components/ProductCard";
import { Product } from "./types/Product";
export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  const handleCreateProduct = async (formData: FormData) => {
    try {
      const newProduct = await createProduct(formData);
      setProducts([...products, newProduct]);
      setError(null);
    } catch (err) {
      setError("Failed to create product");
    }
  };

  const handleUpdateProduct = async (formData: FormData) => {
    if (!editingProduct) return;

    try {
      const updatedProduct = await updateProduct(editingProduct.id, formData);
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setEditingProduct(null);
      setError(null);
    } catch (err) {
      setError("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Management</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-8">
        {editingProduct ? (
          <div>
            <ProductForm
              onSubmit={handleUpdateProduct}
              initialData={editingProduct}
              buttonText="Update"
            />
            <button
              onClick={() => setEditingProduct(null)}
              className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
            >
              Cancel Editing
            </button>
          </div>
        ) : (
          <ProductForm onSubmit={handleCreateProduct} buttonText="Create" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
            onEdit={setEditingProduct}
          />
        ))}
      </div>
    </div>
  );
}
