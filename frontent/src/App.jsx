import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
  <div className="container">

    <Link className="navbar-brand fw-bold" to="/">
      Inventory System
    </Link>

    <div className="navbar-nav ms-auto">

      <Link
        className="nav-link"
        to="/"
      >
        Dashboard
      </Link>

      <Link
        className="nav-link"
        to="/products"
      >
        Products
      </Link>

      <Link
        className="nav-link"
        to="/customers"
      >
        Customers
      </Link>

      <Link
        className="nav-link"
        to="/orders"
      >
        Orders
      </Link>

    </div>

  </div>
</nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;