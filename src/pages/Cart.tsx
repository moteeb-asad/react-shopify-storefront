import { useShop } from "@context/shopContext";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const {
    checkout,
    removeShopifyCheckoutItem,
    removeShopifyDiscount,
    increment,
    decrement,
    quantityvalue,
    setQuantityValue,
    quantityoverlay,
    selectedqtyoverlay,
  } = useShop();

  const cartItems = checkout?.lineItems ? checkout.lineItems.length : 0;
  const cartDiscounts = checkout?.discountApplications
    ? checkout.discountApplications.length
    : 0;

  function formatPrice(price: string | number): string {
    const fixedPrice = Number(price).toFixed(2);
    const item = fixedPrice.split(".");
    if (item[1] === "00") {
      return item[0];
    } else {
      return fixedPrice;
    }
  }

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-total">Total</th>
                    <th className="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {checkout?.lineItems &&
                    checkout.lineItems.map((item) => (
                      <tr key={item.id}>
                        <td className="product-thumbnail">
                          <img
                            src={
                              item.variant?.image?.src ||
                              item.variant?.image?.url ||
                              "/placeholder.jpg"
                            }
                            alt={item.title}
                            className="img-fluid"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td className="product-name">
                          <h2 className="h5 text-black">{item.title}</h2>
                        </td>
                        <td>Rs {formatPrice(item.variant.price.amount)}</td>
                        <td>
                          <div className="input-group mb-3 d-flex align-items-center quantity-container">
                            <div className="input-group-prepend">
                              <button
                                className="btn btn-outline-black decrease"
                                type="button"
                                onClick={() =>
                                  decrement(item.id, item.quantity)
                                }
                              >
                                −
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control text-center quantity-amount"
                              value={
                                quantityoverlay &&
                                selectedqtyoverlay === item.id
                                  ? quantityvalue
                                  : item.quantity
                              }
                              placeholder=""
                              readOnly
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-black increase"
                                type="button"
                                onClick={() =>
                                  increment(item.id, item.quantity)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          Rs{" "}
                          {formatPrice(
                            Number(item.variant.price.amount) * item.quantity
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-black btn-sm"
                            onClick={() => removeShopifyCheckoutItem(item.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-6 mb-3 mb-md-0">
                <button className="btn btn-black btn-sm btn-block">
                  Update Cart
                </button>
              </div>
              <div className="col-md-6">
                <NavLink
                  to="/shop"
                  className="btn btn-outline-black btn-sm btn-block"
                >
                  Continue Shopping
                </NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="text-black h4" htmlFor="coupon">
                  Coupon
                </label>
                <p>Enter your coupon code if you have one.</p>
              </div>
              <div className="col-md-8 mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control py-3"
                  id="coupon"
                  placeholder="Coupon Code"
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-black">Apply Coupon</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">
                      Cart Totals
                    </h3>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">
                      Rs {formatPrice(checkout?.subtotalPrice?.amount || 0)}
                    </strong>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">
                      Rs {formatPrice(checkout?.totalPrice?.amount || 0)}
                    </strong>
                  </div>
                </div>

                {cartDiscounts > 0 && (
                  <div className="row mb-5">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <span className="text-black">Discounts</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <div className="d-flex flex-column">
                        {checkout?.discountApplications?.map(
                          (discount, index) => (
                            <span key={index}>
                              {discount.title}: -Rs{" "}
                              {discount.value.amount?.amount || "0"}
                              <button
                                type="button"
                                className="btn-close ms-2"
                                aria-label="Close"
                                onClick={() => removeShopifyDiscount()}
                              ></button>
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-black btn-lg py-3 btn-block">
                      <a
                        href={checkout?.webUrl || "#"}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Proceed To Checkout
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
