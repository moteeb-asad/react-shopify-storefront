import sofaImage from "@assets/images/sofa.png";

export default function Footer() {
  return (
    <>
      <footer className="footer-section text-left">
        <div className="container relative">
          <div className="sofa-img">
            <img src={sofaImage} alt="Sofa" className="img-fluid" />
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="subscription-form">
                <h3 className="d-flex align-items-center">
                  <span>React Shopify Storefront</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="border-top copyright text-center">
            <div className="row pt-4 pb-4">
              <div className="col-lg-12">
                <p className="text-center mb-0">
                  Copyright &copy; 2025. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
