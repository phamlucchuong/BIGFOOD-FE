
export default function ProductCard({ product, onAddToCart, onProductClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm w-full max-w-xs pb-4" onClick={() => onProductClick(product)} >
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
}