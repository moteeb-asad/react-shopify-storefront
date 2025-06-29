import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "@pages/Shop";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Cart from "@pages/Cart";
import Details from "@pages/Details";
import ProductDetail from "@pages/ProductDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/details" element={<Details />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
