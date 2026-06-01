import { useEffect, useState } from "react";
import API from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete customer");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/customers", formData);

      setFormData({
        fullname: "",
        email: "",
        phone: ""
      });

      fetchCustomers();

      alert("Customer Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add customer");
    }
  };

  return (
    <div>

      {/* Add Customer */}

      <div className="card shadow-lg p-4 mb-4">
        <h2 className="text-primary mb-4">
          Add Customer
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success"
          >
            Add Customer
          </button>

        </form>
      </div>

      {/* Customer List */}

      <div className="card shadow-lg p-4">

        <h2 className="text-primary mb-4">
          Customer List
        </h2>

        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.fullname}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this customer?"
                        )
                      ) {
                        deleteCustomer(customer.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Customers;