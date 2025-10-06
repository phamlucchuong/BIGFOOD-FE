import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductList from '../../components/Pickfood/ProductList';


export default function Pickfood({ onLoginClick }) {

  const [cart, setCart] = useState([]);

  //  Hàm xử lý khi thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Giảm hoặc xóa sản phẩm
  const removeFromCart = (productId) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div>
        <div>
          <img
            src="/public/asia-eu-category.png"
            alt="Ảnh demo"
            className="h-[30vh] w-full rounded-none object-cover"
          />
        </div>
        <div className="mx-auto px-60">
          <div className="flex flex-col gap-3 py-4">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold text-2xl">Cua Bac - Juice & Fruit - Lê Thánh Tông</h1>
              <div className="rounded-xl border border-gray-300 px-2 py-1">
                <button>Yêu thích</button>
              </div>
            </div>
            <p>164 Le Thanh Tong, Phuong Ben Thanh, Quan 1, Tphcm</p>
            <a className="underline" href="">Thong tin quan</a>

          </div>
          <div>

            <div className="flex flex-row gap-1 items-center border border-gray-300 focus-within:border-blue-500 rounded-lg px-3 py-2 w-full">
              <i className="fa fa-search text-gray-400"></i>
              <input
                type="text"
                placeholder="Tìm kiếm trong nhà hàng"
                className="flex-1 focus:outline-none"
              />
            </div>
            <div className="flex flex-row gap-2 py-4">
              <div className='rounded-2xl border border-gray-300 py-1 uppercase flex gap-1 px-4 bg-gray-500'>
                <a href="">yogurt</a>
                <span>5</span>
              </div>
              <div className='rounded-2xl border border-gray-300 py-1 uppercase flex gap-1 px-4'>
                <a href="">yogurt</a>
                <span>5</span>
              </div>
              <div className='rounded-2xl border border-gray-300 py-1 uppercase flex gap-1 px-4'>
                <a href="">yogurt</a>
                <span>5</span>
              </div>
              <div className='rounded-2xl border border-gray-300 py-1 uppercase flex gap-1 px-4'>
                <a href="">yogurt</a>
                <span>5</span>
              </div>
            </div>
          </div>


        </div>
        <div className="mx-auto px-60 bg-gray-100">
          <div className="flex w-full py-8">
            {/* Khối chiếm 75% */}
            <div className="w-3/4">
              <ProductList onAddToCart={addToCart} />
            </div>

            {/* Khối chiếm 25% */}

            <div className="flex-1 w-1/4 ml-4">
              <div className="sticky top-0 z-20">
                <h2 className="text-2xl font-bold mb-4 text-center">Giỏ hàng của tôi</h2>
                <div className="bg-white rounded-lg p-4 shadow min-h-[200px] flex flex-col items-center justify-center">
                  {cart.length === 0 ? (
                    <>
                      <img src="https://via.placeholder.com/100x100?text=🛒" alt="empty" />
                      <p className="text-gray-500 mt-2">Giỏ hàng hiện đang trống</p>
                    </>
                  ) : (
                    <div className="w-full">
                      {cart.map(item => (
                        <div key={item.id} className="flex flex-col py-2 border-b text-sm">
                          <div>{item.name}</div>

                          <div className="flex flex-row justify-between">
                            <div>
                              {item.price}
                            </div>
                            <div className='flex flex-row'>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-gray-400 text-white w-6 h-6 rounded-xl flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="min-w-[24px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => addToCart(item)}
                                className="bg-yellow-400 text-white w-6 h-6 rounded-xl flex items-center justify-center"
                              >
                                +
                              </button></div>
                          </div>


                        </div>
                      ))}

                      {/*Hiển thị tổng tiền */}
                      <div className="mt-4 text-right font-bold text-lg">
                        Tổng: {totalPrice.toLocaleString()}đ
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
