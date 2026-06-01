import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: ""
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
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
      await API.post("/orders", {
        customer_id: Number(formData.customer_id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity)
      });

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: ""
      });

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to create order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Orders</h1>

      <h2>Create Order</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="customer_id"
          placeholder="Customer ID"
          value={formData.customer_id}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="product_id"
          placeholder="Product ID"
          value={formData.product_id}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Order
        </button>
      </form>

      <hr />

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>Order #{order.id}</h3>
          <p>Customer ID: {order.customer_id}</p>
          <p>Product ID: {order.product_id}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Total Amount: ₹{order.total_amount}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;