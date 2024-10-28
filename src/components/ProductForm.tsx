import React from "react";
import { useState } from "react";
import { Product } from "../types/Product";
import "../styles/styles.css";

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: Product;
  buttonText: string;
}

export const ProductForm = ({
  onSubmit,
  initialData,
  buttonText,
}: ProductFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

      await onSubmit(formData);
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{buttonText} Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="input"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="input"
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required={!initialData}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`button button-primary ${loading ? "disabled" : ""}`}
        >
          {loading ? "Loading..." : buttonText}
        </button>
      </form>
    </div>
  );
};
