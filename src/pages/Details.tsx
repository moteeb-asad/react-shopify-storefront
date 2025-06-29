import rsLogo from "@assets/images/rs-logo.jpg";

function Details() {
  return (
    <div className="built-with-section mb-5">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4">
            <div className="text-left">
              <h1 className="section-title">Headless CMS Built With :</h1>
              <ul>
                <li>Shopify Storefront API</li>
                <li>React JS With Context</li>
                <li>Bootstrap</li>
                <li>TypeScript</li>
                <li>Vite</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="img-wrap">
              <img src={rsLogo} alt="RS Logo" className="img-fluid rs-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
