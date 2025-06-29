import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useShop } from "@context/shopContext";
import { ShopifyProduct } from "../types/shop";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { fetchProductByHandle, addItemToCheckout, buttonloader } = useShop();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) {
        navigate("/");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedProduct = await fetchProductByHandle(handle);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found");
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product");
        setTimeout(() => navigate("/"), 3000);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle, fetchProductByHandle, navigate]);

  const formatPrice = (price: string): string => {
    const fixedPrice = Number(price).toFixed(2);
    return fixedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAddToCart = () => {
    if (product && product.variants?.[selectedVariant]?.id) {
      addItemToCheckout(product.variants[selectedVariant].id, quantity);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
  };

  if (loading) {
    return (
      <div className="untree_co-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h2 className="mb-4">Loading product...</h2>
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="untree_co-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h2 className="mb-3">Error</h2>
              <p className="text-danger mb-3">{error}</p>
              <p>Redirecting to home page...</p>
              <Link to="/" className="btn btn-success">
                Go Home Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="untree_co-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h2>Product not found</h2>
              <Link to="/" className="btn btn-success mt-3">
                Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="untree_co-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Shop
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="untree_co-section py-8">
        <div className="container">
          <div className="row g-5">
            {/* Product Images - Left Column */}
            <div className="col-lg-6">
              <div className="product-images">
                {/* Main Product Image */}
                <div className="main-image mb-4">
                  <div className="image-container position-relative overflow-hidden rounded-3 shadow-sm">
                    <img
                      src={
                        product.images?.[selectedImage]?.src ||
                        product.images?.[selectedImage]?.url ||
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJETSBTYW5zLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+"
                      }
                      className="img-fluid w-100"
                      alt={
                        product.images?.[selectedImage]?.altText ||
                        product.title
                      }
                      onError={handleImageError}
                      style={{
                        height: "400px",
                        objectFit: "contain",
                        objectPosition: "center",
                        backgroundColor: "#f8f9fa",
                      }}
                    />
                  </div>
                </div>

                {/* Image Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="image-thumbnails">
                    <div className="row g-2">
                      {product.images.slice(0, 4).map((image, index) => (
                        <div key={index} className="col-3">
                          <div
                            className={`thumbnail-container position-relative overflow-hidden rounded-2 cursor-pointer ${
                              selectedImage === index
                                ? "border border-success border-3"
                                : "border border-light"
                            }`}
                            onClick={() => setSelectedImage(index)}
                            style={{
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <img
                              src={
                                image?.src ||
                                image?.url ||
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJETSBTYW5zLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
                              }
                              className="img-fluid w-100"
                              alt={image?.altText || product.title}
                              onError={handleImageError}
                              style={{
                                height: "100px",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      {product.images.length > 4 && (
                        <div className="col-3">
                          <div
                            className="d-flex align-items-center justify-content-center bg-light rounded-2"
                            style={{ height: "100px" }}
                          >
                            <span className="text-muted">
                              +{product.images.length - 4} more
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Information - Right Column */}
            <div className="col-lg-6">
              <div className="product-info text-left">
                {/* Product Title */}
                <h1
                  className="product-title mb-3 fw-bold"
                  style={{ fontSize: "1.8rem", lineHeight: "1.3" }}
                >
                  {product.title}
                </h1>

                {/* Product Price */}
                <div className="product-price mb-4">
                  <h3
                    className="text-success fw-bold mb-2"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Rs{" "}
                    {formatPrice(
                      product.variants?.[selectedVariant]?.price?.amount || "0"
                    )}
                    {product.variants?.[selectedVariant]?.compareAtPrice && (
                      <small
                        className="text-muted text-decoration-line-through ms-3 fw-normal"
                        style={{ fontSize: "1.2rem" }}
                      >
                        Rs{" "}
                        {formatPrice(
                          product.variants[selectedVariant]?.compareAtPrice
                            ?.amount || "0"
                        )}
                      </small>
                    )}
                  </h3>
                </div>

                {/* Product Description */}
                {product.description && (
                  <div className="product-description mb-4">
                    <div
                      className="text-muted lh-lg"
                      style={{ fontSize: "1rem" }}
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                )}

                {/* Variant Selection */}
                {product.variants && product.variants.length > 1 && (
                  <div className="product-variants mb-4">
                    <label
                      className="form-label fw-semibold mb-3"
                      style={{ fontSize: "1.1rem" }}
                    >
                      Choose Option:
                    </label>
                    <select
                      className="form-select form-select-lg shadow-sm"
                      value={selectedVariant}
                      onChange={(e) =>
                        setSelectedVariant(Number(e.target.value))
                      }
                      style={{
                        fontSize: "1rem",
                        borderColor: "#3b5d50",
                        color: "#3b5d50",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#314d43";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 0.2rem rgba(59, 93, 80, 0.25)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#3b5d50";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {product.variants.map((variant, index) => (
                        <option key={variant?.id || index} value={index}>
                          {variant?.title || "Option"} - Rs{" "}
                          {formatPrice(variant?.price?.amount || "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Quantity Selection */}
                <div className="product-quantity mb-5">
                  <label
                    className="form-label fw-semibold mb-3"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Quantity:
                  </label>
                  <div className="d-flex align-items-center">
                    <div
                      className="input-group shadow-sm"
                      style={{ maxWidth: "180px" }}
                    >
                      <button
                        className="btn fw-bold text-white"
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{
                          width: "50px",
                          backgroundColor: "#3b5d50",
                          borderColor: "#3b5d50",
                          fontSize: "1.2rem",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#314d43";
                          e.currentTarget.style.borderColor = "#314d43";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#3b5d50";
                          e.currentTarget.style.borderColor = "#3b5d50";
                        }}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="form-control form-control-lg text-center fw-bold border-0"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        min="1"
                        style={{
                          fontSize: "1.2rem",
                          backgroundColor: "#f8f9fa",
                          color: "#3b5d50",
                          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.backgroundColor = "#ffffff";
                          e.currentTarget.style.boxShadow =
                            "inset 0 1px 3px rgba(59, 93, 80, 0.2)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.backgroundColor = "#f8f9fa";
                          e.currentTarget.style.boxShadow =
                            "inset 0 1px 3px rgba(0,0,0,0.1)";
                        }}
                      />
                      <button
                        className="btn fw-bold text-white"
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        style={{
                          width: "50px",
                          backgroundColor: "#3b5d50",
                          borderColor: "#3b5d50",
                          fontSize: "1.2rem",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#314d43";
                          e.currentTarget.style.borderColor = "#314d43";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#3b5d50";
                          e.currentTarget.style.borderColor = "#3b5d50";
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="product-actions mb-5">
                  <div className="d-flex flex-column flex-sm-row gap-3">
                    <button
                      className={`btn btn-lg px-5 py-3 fw-bold text-white shadow ${
                        buttonloader === "active" ? "disabled" : ""
                      }`}
                      onClick={handleAddToCart}
                      disabled={buttonloader === "active"}
                      style={{
                        fontSize: "1.1rem",
                        minWidth: "200px",
                        backgroundColor: "#3b5d50",
                        borderColor: "#3b5d50",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (buttonloader !== "active") {
                          e.currentTarget.style.backgroundColor = "#314d43";
                          e.currentTarget.style.borderColor = "#314d43";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (buttonloader !== "active") {
                          e.currentTarget.style.backgroundColor = "#3b5d50";
                          e.currentTarget.style.borderColor = "#3b5d50";
                          e.currentTarget.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      {buttonloader === "active" ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Adding...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-shopping-cart me-2"></i>
                          Add to Cart
                        </>
                      )}
                    </button>
                    <Link
                      to="/shop"
                      className="btn btn-lg px-5 py-3 fw-bold shadow text-decoration-none"
                      style={{
                        fontSize: "1.1rem",
                        minWidth: "200px",
                        backgroundColor: "#f9bf29",
                        borderColor: "#f9bf29",
                        color: "#2f2f2f",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8b810";
                        e.currentTarget.style.borderColor = "#f8b810";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f9bf29";
                        e.currentTarget.style.borderColor = "#f9bf29";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                {/* Product Metadata */}
                <div className="product-metadata">
                  <div className="row g-4">
                    {product.productType && (
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span
                            className="text-muted mb-1"
                            style={{ fontSize: "0.9rem" }}
                          >
                            Product Type:
                          </span>
                          <span
                            className="fw-semibold"
                            style={{ fontSize: "1rem" }}
                          >
                            {product.productType}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {product.tags && product.tags.length > 0 && (
                    <div className="product-tags mt-4">
                      <span
                        className="text-muted me-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Tags:
                      </span>
                      {product.tags.slice(0, 5).map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark me-2 mb-2 px-3 py-2"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
