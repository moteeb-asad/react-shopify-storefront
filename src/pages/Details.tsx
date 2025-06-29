import rsLogo from "@assets/images/rs-logo.jpg";

function Details() {
  return (
    <div className="built-with-section py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center g-5">
          <div className="col-lg-6">
            <div className="content-wrapper p-4 bg-white rounded shadow-sm h-100">
              <div className="text-content">
                <h1 className="section-title display-5 fw-bold text-primary mb-4">
                  Headless E-commerce
                </h1>
                <p className="lead text-muted mb-4 lh-md">
                  Built with cutting-edge technologies to deliver exceptional
                  performance and user experience for modern online commerce.
                </p>

                <div className="technology-stack">
                  <h3 className="h4 fw-bold text-dark mb-4 border-bottom border-primary pb-2">
                    Technology Stack
                  </h3>

                  <div className="tech-list">
                    <div className="text-left tech-item mb-4 p-3 border-start border-primary border-3 bg-light rounded-end">
                      <h5 className="fw-bold text-primary mb-2">
                        Shopify Storefront API
                      </h5>
                      <p className="text-muted mb-0 small lh-sm">
                        Headless commerce solution providing scalable e-commerce
                        operations with enterprise-grade reliability
                      </p>
                    </div>

                    <div className="text-left tech-item mb-4 p-3 border-start border-success border-3 bg-light rounded-end">
                      <h5 className="fw-bold text-success mb-2">
                        React 18 with Context API
                      </h5>
                      <p className="text-muted mb-0 small lh-sm">
                        Modern component-based architecture with efficient state
                        management and concurrent rendering features
                      </p>
                    </div>

                    <div className="text-left tech-item mb-4 p-3 border-start border-info border-3 bg-light rounded-end">
                      <h5 className="fw-bold text-info mb-2">TypeScript</h5>
                      <p className="text-muted mb-0 small lh-sm">
                        Type-safe development ensuring enhanced code quality,
                        maintainability, and developer productivity
                      </p>
                    </div>

                    <div className="text-left tech-item mb-4 p-3 border-start border-warning border-3 bg-light rounded-end">
                      <h5 className="fw-bold text-warning mb-2">
                        Vite Build System
                      </h5>
                      <p className="text-muted mb-0 small lh-sm">
                        Lightning-fast development environment with instant HMR
                        and optimized production builds
                      </p>
                    </div>

                    <div className="text-left tech-item mb-0 p-3 border-start border-secondary border-3 bg-light rounded-end">
                      <h5 className="fw-bold text-secondary mb-2">
                        Bootstrap 5
                      </h5>
                      <p className="text-muted mb-0 small lh-sm">
                        Modern responsive design framework ensuring seamless
                        cross-platform compatibility
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="image-wrapper p-4 bg-white rounded shadow-sm h-100 d-flex align-items-center justify-content-center">
              <div className="img-wrap text-center">
                <img
                  src={rsLogo}
                  alt="React Shopify Storefront - Modern E-Commerce Platform"
                  className="img-fluid rounded "
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
                <div className="mt-4">
                  <h4 className="h5 fw-bold text-dark mb-2">
                    React Shopify Storefront
                  </h4>
                  <p className="text-muted small mb-0">
                    Professional E-commerce Solution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
