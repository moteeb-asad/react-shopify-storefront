import { useEffect, useState } from "react";
import Cart from "@assets/images/cart.svg";
import { NavLink } from "react-router-dom";
import { useShop } from "@context/shopContext";
import { ShopifyCheckout } from "../types/shop";

export default function Header() {
  const { checkout } = useShop(); // Changed back to checkout
  const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0);

  useEffect(() => {
    calculateQuantity(checkout);
  }, [checkout]);

  function calculateQuantity(checkout: ShopifyCheckout | null) {
    let cartTotalNumber = 0;
    if (checkout && checkout.lineItems) {
      for (let i = 0; i < checkout.lineItems.length; i++) {
        cartTotalNumber = cartTotalNumber + checkout.lineItems[i].quantity;
      }
      setCartTotalQuantity(cartTotalNumber);
    } else {
      setCartTotalQuantity(0);
    }
  }

  return (
    <nav
      className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark"
      aria-label="Furni navigation bar"
    >
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Furni<span>.</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsFurni"
          aria-controls="navbarsFurni"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/details">
                About us
              </NavLink>
            </li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            <li>
              <NavLink className="nav-link" to="/cart">
                <img src={Cart} alt="Cart" />
                <span className="cart-count">{cartTotalQuantity}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
