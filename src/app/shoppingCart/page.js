"use client";

import React, { useState } from "react";

const initialCart = [
  // Ejemplo de productos en el carrito
  // { id: "1", name: "Producto 1", price: 10, quantity: 2, image: "/images/ejemplo.jpg" }
];

const ShoppingCartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1 className="title is-3 my-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your shopping cart is currently empty.</p>
      ) : (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th></th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover" }} />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                    style={{ width: 60 }}
                  />
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button className="button is-danger is-small" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="has-text-right mt-4">
        <strong>Total: ${total}</strong>
      </div>
      <div className="has-text-right mt-2">
        <button className="button is-primary" disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartPage;