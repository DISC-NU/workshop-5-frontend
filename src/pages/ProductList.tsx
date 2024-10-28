import { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../api/products";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/Product";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
    <div>
      <h1 className="title">Products</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
            onEdit={() => {}}
          />
        ))}
      </div>
    </div>
  );
};
