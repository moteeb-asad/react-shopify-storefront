import { useShop } from "@context/shopContext";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const {
    checkout,
    removeShopifyCartItem,
    removeShopifyDiscount,
    increment,
    decrement,
    quantityvalue,
    setQuantityValue,
    quantityoverlay,
    selectedqtyoverlay,
  } = useShop();

  const checkoutItems = checkout?.lineItems ? checkout.lineItems.length : 0;
  const checkoutDiscounts = checkout?.discountApplications
    ? checkout.discountApplications.length
    : 0;

  function formatPrice(price: string | number): string {
    const fixedPrice = Number(price).toFixed(2);
    const itemprice = fixedPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return itemprice;
  }

  return (
    <>
      <div className="untree_co-section before-footer-section cart-wrap">
        <div className="container">
          {checkoutItems ? (
            <>
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
                        {checkout.lineItems &&
                          checkout.lineItems.map((item) => (
                            <tr key={item.id}>
                              <td className="product-thumbnail">
                                <img
                                  src={item.variant.image?.url}
                                  alt={item.title}
                                  className="img-fluid"
                                />
                              </td>
                              <td className="product-name">
                                <h2 className="h5 text-black">{item.title}</h2>
                              </td>
                              <td>
                                Rs {formatPrice(item.variant.price.amount)}
                              </td>
                              <td>
                                <div
                                  className="input-group mb-3 d-flex align-items-center quantity-container input-wrap"
                                  style={{ maxWidth: "120px" }}
                                >
                                  {selectedqtyoverlay === item.id &&
                                  quantityoverlay ? (
                                    <div className="qty-overlay"></div>
                                  ) : null}
                                  <div className="input-group-prepend">
                                    <button
                                      className="btn btn-outline-black decrease"
                                      type="button"
                                      id="minus-button"
                                      onClick={() => decrement(item.id)}
                                    >
                                      -
                                    </button>
                                  </div>
                                  <input
                                    type="number"
                                    className="form-control text-center quantity-amount"
                                    id="quantity"
                                    placeholder={item.quantity.toString()}
                                    value={item.quantity}
                                    onChange={() => {
                                      setQuantityValue(quantityvalue + 1);
                                      increment(item.id, quantityvalue + 1);
                                    }}
                                    readOnly
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className="btn btn-outline-black increase"
                                      type="button"
                                      id="plus-button"
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
                                  Number(item.variant.price.amount) *
                                    item.quantity
                                )}
                              </td>
                              <td>
                                <button
                                  className="btn btn-black btn-sm"
                                  onClick={() =>
                                    removeShopifyCartItem([item.id])
                                  }
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
                  <div className="row mb-5 text-left">
                    <div className="col-md-6">
                      <NavLink
                        className="btn btn-outline-black btn-sm btn-block"
                        to="/"
                      >
                        Continue Shopping
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pl-5">
                  <div className="row justify-content-end">
                    <div className="col-md-7 text-left">
                      <div className="row">
                        <div className="col-md-12 text-right border-bottom mb-5">
                          <h3 className="text-black h4 text-uppercase">
                            Cart Totals
                          </h3>
                        </div>
                      </div>
                      {checkoutDiscounts ? (
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <span className="text-black">Discount Applied</span>
                          </div>
                          <div className="col-md-6 text-right">
                            {checkout.discountApplications?.map(
                              (item, index) => (
                                <span key={index}>
                                  {item.code}
                                  <strong
                                    className="text-black"
                                    onClick={() =>
                                      removeShopifyDiscount(checkout)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    X
                                  </strong>
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      ) : null}

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <span className="text-black">Subtotal</span>
                        </div>
                        <div className="col-md-6 text-right">
                          <strong className="text-black">
                            Rs{" "}
                            {formatPrice(checkout.subtotalPrice?.amount || 0)}
                          </strong>
                        </div>
                      </div>
                      <div className="row mb-5">
                        <div className="col-md-6">
                          <span className="text-black">Total</span>
                        </div>
                        <div className="col-md-6 text-right">
                          <strong className="text-black">
                            Rs {formatPrice(checkout.totalPrice?.amount || 0)}
                          </strong>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <a
                            className="btn btn-black btn-lg py-3 btn-block"
                            href={checkout.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Proceed To Checkout
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="row justify-content-center">
              <h4 className="mb-4">Cart Is Empty.</h4>
              <NavLink
                className="btn btn-outline-black btn-sm btn-block cont-shop-btn"
                to="/"
              >
                Continue Shopping
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
