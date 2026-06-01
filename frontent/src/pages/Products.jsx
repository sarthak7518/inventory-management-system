
import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
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
      await API.post("/products", {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      });

      setFormData({
        name: "",
        sku: "",
        price: "",
        quantity: ""
      });

      fetchProducts();
      alert("Product Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/products/${editingProduct.id}`,
        {
          name: editingProduct.name,
          sku: editingProduct.sku,
          price: Number(editingProduct.price),
          quantity: Number(editingProduct.quantity)
        }
      );

      setEditingProduct(null);
      fetchProducts();

      alert("Product Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  return (
    <div>

      {/* Add Product */}
      <div className="card shadow-lg p-4 mb-4">
        <h2 className="text-primary mb-4">
          Add Product
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="sku"
              className="form-control"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Product
          </button>

        </form>
      </div>

      {/* Update Product */}
      {editingProduct && (
        <div className="card shadow-lg p-4 mb-4">
          <h2 className="text-warning mb-4">
            Update Product
          </h2>

          <form onSubmit={updateProduct}>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value
                  })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={editingProduct.sku}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    sku: e.target.value
                  })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value
                  })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                value={editingProduct.quantity}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    quantity: e.target.value
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              Update Product
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      {/* Product List */}
      <div className="card shadow-lg p-4">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">
            Product List
          </h2>

          <input
            type="text"
            className="form-control w-25"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products
              .filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>₹{product.price}</td>
                  <td>{product.quantity}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?"
                          )
                        ) {
                          deleteProduct(product.id);
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

export default Products;

