import { useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import Cross from "@assets/images/cross.svg";
import Cart from "@assets/images/cart.svg";
import { useShop } from "@context/shopContext";
import { ShopifyProduct } from "../types/shop";

interface ProductsProps {
  currentItems: ShopifyProduct[];
}

interface PaginatedProductsProps {
  itemsPerPage: number;
  items: ShopifyProduct[];
}

interface PageClickEvent {
  selected: number;
}

function Products({ currentItems }: ProductsProps) {
  const { addItemToShopifyCart, buttonloader } = useShop();

  function formatPrice(price: string): string {
    const fixedPrice = Number(price).toFixed(2);
    const itemprice = fixedPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return itemprice;
  }

  return (
    <>
      {currentItems.map((product, index) => (
        <div className="col-12 col-md-4 col-lg-3 mb-5" key={index}>
          <div className="product-item">
            <NavLink to={`/product/${product.handle}`}>
              <img
                src={product.images[0]?.src || product.images[0]?.url}
                className="img-fluid product-thumbnail"
                alt={product.images[0]?.altText || product.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                }}
              />
            </NavLink>
            <h3 className="product-title">
              <NavLink
                to={`/product/${product.handle}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {product.title}
              </NavLink>
            </h3>
            <strong className="product-price">
              Rs {formatPrice(product.variants[0]?.price.amount)}
            </strong>
            <div className="pi-icons-wrap">
              <span
                className={`icon-cross ${
                  buttonloader === "active" ? "loading" : ""
                }`}
                onClick={() => addItemToShopifyCart(product.variants[0]?.id, 1)}
                style={{ cursor: "pointer" }}
                title="Add to Cart"
              >
                <img src={Cross} className="img-fluid" alt="Add to cart" />
              </span>
              <NavLink className="icon-cart" to="/cart" title="View Cart">
                <img src={Cart} className="img-fluid" alt="View cart" />
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function PaginatedProducts({ itemsPerPage, items }: PaginatedProductsProps) {
  const [itemOffset, setItemOffset] = useState<number>(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="row">
        <Products currentItems={currentItems} />
      </div>
      <div className="row">
        <div className="col-12 text-right">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={() => null}
            className="pagination justify-content-center"
            pageClassName="page-item"
            previousClassName="page-item"
            nextClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          />
        </div>
      </div>
    </>
  );
}

export default PaginatedProducts;
