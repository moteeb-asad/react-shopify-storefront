import { useEffect } from "react";
import { useShop } from "../context/shopContext";
import PaginatedProducts from "../components/PaginatedProducts";

export default function Shop() {
  const { fetchProducts, products } = useShop();

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array - only run once on mount

  return (
    <>
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <PaginatedProducts itemsPerPage={8} items={products} />
        </div>
      </div>
    </>
  );
}
