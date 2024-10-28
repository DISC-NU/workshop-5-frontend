import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="nav">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          Product Management
        </Link>
        <Link to="/products/new" className="button button-primary">
          Add Product
        </Link>
      </div>
    </nav>
  );
};
