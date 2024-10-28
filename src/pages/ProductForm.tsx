import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createProduct, updateProduct, getProductById } from "../api/products";
import "../styles/styles.css";

export const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      const product = await getProductById(productId);
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description);
    } catch (err) {
      setError("Failed to load product");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }

      navigate("/");
    } catch (err) {
      setError("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">{id ? "Edit Product" : "Create Product"}</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            className="input"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            id="image"
            className="input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required={!id}
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            disabled={loading}
            className="button button-primary"
          >
            {loading ? "Saving..." : id ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="button button-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
