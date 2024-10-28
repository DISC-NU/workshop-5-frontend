import { Product } from "../types/Product";

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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 truncate">{product.name}</h3>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <p className="text-lg font-bold mb-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
