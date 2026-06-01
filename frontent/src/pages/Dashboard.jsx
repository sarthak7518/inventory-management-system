import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">

      <div className="bg-primary text-white p-5 rounded shadow">
        <h1 className="display-4 fw-bold">
          Inventory Management System
        </h1>

        <p className="lead">
          Manage Products, Customers and Orders efficiently.
        </p>
      </div>

      <div className="row mt-5">

        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <i className="bi bi-box-seam fs-1 text-primary"></i>
              <h3>Products</h3>

              <Link
                to="/products"
                className="btn btn-primary"
              >
                Manage Products
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <i className="bi bi-people-fill fs-1 text-success"></i>
              <h3>Customers</h3>

              <Link
                to="/customers"
                className="btn btn-success"
              >
                Manage Customers
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <i className="bi bi-cart-fill fs-1 text-danger"></i>
              <h3>Orders</h3>

              <Link
                to="/orders"
                className="btn btn-danger"
              >
                Manage Orders
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;