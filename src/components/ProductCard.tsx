import { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onDelete,
  onEdit,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".button-group")) {
      return;
    }
    navigate(`/products/${product.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image"
        />
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        <div className="button-group">
          <button onClick={handleEdit} className="button button-secondary">
            Edit
          </button>
          <button onClick={handleDelete} className="button button-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
