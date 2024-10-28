import { Product } from "../types/Product";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (
  id: string,
  formData: FormData
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};
