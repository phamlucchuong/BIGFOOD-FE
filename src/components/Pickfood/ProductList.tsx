import React from 'react';
import data from '../../dataSample/pickfood.json'; 


// Component ProductCard
const ProductCard = ({ product, onAddToCart,onProductClick  }) => (
  <div className="bg-white rounded-lg shadow-sm w-full max-w-xs pb-4" onClick={() => onProductClick (product)} >
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md hover:scale-105 transition-transform" />
    <div className="mt-2 mx-4">
      <h3 className="text-sm font-semibold">{product.name}</h3>
      <p className="text-xs text-gray-500 mt-1">🛒 {product.sold} đã bán</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-base">{product.price.toLocaleString()}đ</span>
        <button
          onClick={(e) => {
            onAddToCart(product)
            e.stopPropagation()
          }} // Gọi hàm khi click
          className="bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

//Component ProductCategory
const ProductCategory = ({ category, onAddToCart,onProductClick  }) => (
  <div className="mb-10">
    <h2 id={category.categoryindex} className="text-2xl font-bold mb-4">{category.category}</h2>
    <div className="grid grid-cols-3 gap-4">
      {category.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart} //Truyền xuống
          onProductClick = {onProductClick}

        />
      ))}
    </div>
  </div>
);

// 🔹 Component chính ProductList
const ProductList = ({ onAddToCart,onProductClick  }) => {
  return (
    <div>
      {data.map((category, index) => (
        <ProductCategory
          key={index}
          category={category}
          onAddToCart={onAddToCart} //Truyền từ cha
          onProductClick = {onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductList;