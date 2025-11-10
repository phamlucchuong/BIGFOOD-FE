import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import data from "../../../dataSample/pickfood.json";
import RelatedRestaurants from "../../../components/dropdown/RelatedRestaurants";
import ProductSection from "../../../sections/ProductSection";
import { ChevronDown, ChevronRight, ClipboardList } from "lucide-react";

export default function RestaurantDetail() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // state cho popup
  const [selectedProduct, setSelectedProduct] = useState(null); // state lưu thông tin sản phẩm khi click
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const [showSlider, setShowSlider] = useState(false);


  // Hàm xử lý khi click vào sản phẩm để mở popup
  const handleProductClick = (product) => {
    setSelectedProduct(product); // Lưu thông tin sản phẩm vào state
    setShowPopup(true); // Hiển thị popup
  };
  // Hàm xử lý thay đổi trong textfield ghi chú
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };


  const addToCart = (product) => {
    const extraPrice = selectedSize === "L" ? 10000 : 0;
    const finalPrice = product.price + extraPrice;

    setCart((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (exists) {
        // Nếu cùng sản phẩm và cùng size, cộng thêm số lượng
        return prev.map((item) =>
          item.id === product.id && item.size === selectedSize
            ? {
              ...item,
              quantity: total == 1 ? item.quantity + 1 : total,
              note,
            }
            : item
        );
      } else {
        // Nếu là size khác, thêm mới vào giỏ
        return [
          ...prev,
          {
            ...product,
            quantity: total,
            note,
            size: selectedSize,
            price: finalPrice, // lưu giá theo size
          },
        ];
      }
    });

    setTotal(1);
    setNote("");
    setSelectedSize("M");
    setShowPopup(false);
  };

  // Hàm đóng popup
  const closePopup = () => {
    setShowPopup(false);
    setTotal(1);
  };

  const handleAddToCart = (item) => {
    const _note = note;
    const updatedItem = { ...item, note: _note };
    addToCart(updatedItem);
  };

  // Giảm hoặc xóa sản phẩm
  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const onFinish = async (e) => {
    e.preventDefault();

    alert("đạt hàng thành công");
  };

  return (
    <>
      <div>
        <div>
          <img
            src="src\assets\images\drink-category.png"
            alt="Ảnh demo"
            className="h-[30vh] w-full rounded-none object-cover"
          />
        </div>
        <div className="mx-auto px-60">
          <div className="flex flex-col gap-3 py-4">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold text-2xl">
                Cua Bac - Juice & Fruit - Lê Thánh Tông
              </h1>
              <div className="rounded-xl border border-gray-300 px-2 py-1">
                <button>Yêu thích</button>
              </div>
            </div>
            <p>164 Le Thanh Tong, Phuong Ben Thanh, Quan 1, Tphcm</p>
            <a className="underline" href="">
              Thong tin quan
            </a>
          </div>

          <div className="w-full mt-4">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setShowSlider(!showSlider)}
                className="border rounded-full px-3 py-1 text-sm flex items-center gap-1 text-gray-700"
              >
                Nhà hàng tương tự
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showSlider ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {showSlider && <RelatedRestaurants category="juice" />}

            {/* <button className="flex items-center justify-center min-w-[40px] bg-gray-100 rounded-full size-10 hover:bg-gray-200">
              <ChevronRight />
            </button> */}
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
              {data.map((categoryData, index) => {
                // Tính tổng số sản phẩm đã bán trong mỗi category
                const totalSold = categoryData.products.reduce(
                  (sum, product) => sum + product.sold,
                  0
                );
                const totalProducts = categoryData.products.length;

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-300 py-1 uppercase flex gap-1 px-4"
                  >
                    <a href={"#" + categoryData.categoryindex}>
                      {categoryData.category}
                    </a>
                    <span className="text-blue-700">{totalProducts}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mx-auto px-60 bg-gray-100">
          <div className="flex w-full py-8">
            {/* Khối chiếm 75% */}
            <div className="w-3/4">
              <ProductSection
                onAddToCart={addToCart}
                onProductClick={handleProductClick}
              />
            </div>

            {/* Khối chiếm 25% */}

            <div className="flex-1 w-1/4 ml-4">
              <div className="sticky top-20 z-20">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Giỏ hàng của tôi
                </h2>
                <div className="bg-white rounded-lg p-4 shadow min-h-[200px] flex flex-col items-center justify-center">
                  {cart.length === 0 ? (
                    <>
                      <ClipboardList size={100} />
                      <p className="text-gray-500 mt-2">
                        Giỏ hàng hiện đang trống
                      </p>
                    </>
                  ) : (
                    <div className="w-full">
                      <form onSubmit={onFinish}>
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col py-2 border-b text-sm"
                          >
                            <div
                              onClick={() => {
                                handleProductClick(item);
                                setNote(item.note);
                                setTotal(item.quantity);
                              }}
                            >
                              {item.name}
                            </div>
                            <div className="overflow-hidden py-1">
                              <p className="text-[12px]">
                                {item.size != "" ? "Size: " + item.size : ""}
                              </p>
                            </div>
                            <div className="overflow-hidden py-1">
                              <p className="italic text-[12px]">
                                {item.note != "" ? "*" + item.note : ""}
                              </p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div>{item.price.toLocaleString()}</div>
                              <div className="flex flex-row">
                                <button
                                  onClick={(e) => {
                                    removeFromCart(item.id);
                                    e.preventDefault();
                                  }}
                                  className="bg-gray-400 text-white w-6 h-6 rounded-xl flex items-center justify-center"
                                >
                                  -
                                </button>
                                <span className="min-w-[24px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={(e) => {
                                    handleAddToCart(item);
                                    e.preventDefault();
                                  }}
                                  className="bg-yellow-400 text-white w-6 h-6 rounded-xl flex items-center justify-center"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/*Hiển thị tổng tiền */}
                        <div className="mt-4 text-right font-bold text-lg">
                          Tổng: {totalPrice.toLocaleString()}đ
                        </div>
                        <div className="flex justify-center bg-orange-400 rounded-lg m-4">
                          <button className="p-2" type="submit">
                            Đặt đơn
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popup hiển thị thông tin chi tiết sản phẩm */}
        {showPopup && selectedProduct && (
          //           const basePrice = selectedProduct.price;
          // const extraPrice = selectedSize === 'L' ? 10000 : 0;
          // const finalPrice = (basePrice + extraPrice) * total;

          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full shadow-lg relative">
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 bg-gray-200 text-gray-800 rounded-full p-2 text-xl"
              >
                &times;
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-60 object-cover rounded-lg"
              />

              <div className="p-4">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-2xl font-semibold">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xl text-yellow-600">
                    {selectedProduct.price.toLocaleString()}đ
                  </p>
                </div>
                <div>
                  <div class="w-full max-w-lg pt-4 mb-55">
                    <label
                      for="message"
                      class="block text-xs text-gray-600 uppercase mb-1"
                    >
                      Viết lời nhắn cho nhà hàng
                    </label>
                    <textarea
                      id="message"
                      value={note}
                      onChange={handleNoteChange}
                      rows="2"
                      class="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 text-sm"
                      placeholder=""
                    ></textarea>
                    <br />
                    <div class="w-full max-w-lg my-2">
                      <label
                        for="message"
                        class="block text-xs text-gray-600 uppercase mb-1"
                      >
                        Size - bắt buộc
                      </label>

                      <div className="space-y-2">
                        {/* Option M */}
                        <label className="flex justify-between items-center border rounded-lg p-2 cursor-pointer">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="size"
                              value="M"
                              checked={selectedSize === "M"}
                              onChange={() => setSelectedSize("M")}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm">M</span>
                          </div>
                          <span className="text-sm text-gray-500">0đ</span>
                        </label>

                        {/* Option L */}
                        <label className="flex justify-between items-center border rounded-lg p-2 cursor-pointer">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="size"
                              value="L"
                              checked={selectedSize === "L"}
                              onChange={() => setSelectedSize("L")}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm">L - 700ml</span>
                          </div>
                          <span className="text-sm text-gray-500">10.000đ</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-row items-center gap-3">
                  <div className="flex flex-row">
                    <button
                      onClick={() => setTotal(total > 1 ? total - 1 : 1)}
                      className="bg-gray-400 text-white w-6 h-6 rounded-xl flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="min-w-[24px] text-center">{total}</span>
                    <button
                      onClick={() => setTotal(total + 1)}
                      className="bg-yellow-400 text-white w-6 h-6 rounded-xl flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="w-full bg-yellow-500 text-white py-2 rounded-lg"
                  >
                    Thêm vào giỏ -{" "}
                    {(
                      (selectedProduct.price +
                        (selectedSize === "L" ? 10000 : 0)) *
                      total
                    ).toLocaleString()}
                    đ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
