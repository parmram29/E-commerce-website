import React from "react"; // Import React library

// A reusable component to display a list of products
// Accepts a `products` prop, which is an array of product objects
const ProductList = ({ products }) => {
  return (
    <ul>
      {/* Iterate over the array of products */}
      {products.map((product) => (
        <li key={product._id}>
          {/* Display product details */}
          <h2>{product.name}</h2> {/* Product name */}
          <p>{product.description}</p> {/* Product description */}
          <p>Price: ${product.price}</p> {/* Product price */}
        </li>
      ))}
    </ul>
  );
};

export default ProductList; // Export the component for use in other files
