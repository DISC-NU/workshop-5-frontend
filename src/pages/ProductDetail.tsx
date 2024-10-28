import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById, deleteProduct } from "../api/products";
import { Product } from "../types/Product";
export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !product ||
      !window.confirm("Are you sure you want to delete this product?")
    ) {
      return;
    }

    try {
      await deleteProduct(product.id);
      navigate("/");
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <Link to="/" className="button button-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <div className="error-message">Product not found</div>
        <Link to="/" className="button button-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-header">
        <Link to="/" className="back-link">
          ← Back to Products
        </Link>
      </div>

      <div className="product-detail-content">
        <div className="product-detail-image-container">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>

          <div className="product-detail-price-container">
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
          </div>

          <div className="product-detail-description-container">
            <h2 className="product-detail-subtitle">Description</h2>
            <p className="product-detail-description">{product.description}</p>
          </div>

          <div className="product-detail-actions">
            <Link
              to={`/products/${product.id}/edit`}
              className="button button-secondary"
            >
              Edit Product
            </Link>
            <button onClick={handleDelete} className="button button-danger">
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
