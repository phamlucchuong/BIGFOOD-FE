import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import RelatedRestaurants from "../../../components/dropdown/RelatedRestaurants";
import ProductSection from "../../../sections/ProductSection";
import { ChevronDown, ChevronRight, ClipboardList } from "lucide-react";
import useRestaurant from "../../../hooks/data/useRestaurant";
import SizeCard from "../../../components/common/cards/SizeCard";

export default function RestaurantDetail() {
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("id");
  const restaurantName = searchParams.get("name");

  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // state cho popup
  const [selectedProduct, setSelectedProduct] = useState(null); // state lưu thông tin sản phẩm khi click
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const [showSlider, setShowSlider] = useState(false);
  const navigate = useNavigate();

  // load từ sessionStorage khi mở trang
  useEffect(() => {
    const saved = sessionStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const { restaurantDetail, fetchRestaurantDetail } = useRestaurant();
  useEffect(() => {
    console.log("Restaurant ID from URL:", restaurantId);
    if (restaurantId) {
      console.log("Fetching restaurant detail for ID:", restaurantId);
      fetchRestaurantDetail(restaurantId);
    }
  }, []);

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
    // Lấy giá từ foodOptions dựa trên selectedSize
    const selectedOption = product.foodOptions?.find(opt => opt.name === selectedSize);
    const finalPrice = selectedOption?.price || 0;

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
            price: finalPrice, // lưu giá theo size từ foodOptions
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

    // Validation: Kiểm tra restaurantId và cart
    // Ưu tiên dùng userId từ restaurantDetail nếu có, nếu không thì dùng từ URL params
    const finalRestaurantId = restaurantDetail?.userId || restaurantId;

    if (!finalRestaurantId || finalRestaurantId.trim() === "") {
      alert("Thiếu thông tin nhà hàng!");
      console.error("Restaurant ID:", {
        fromUrl: restaurantId,
        fromDetail: restaurantDetail?.userId,
        restaurantDetail,
      });
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    // Validate từng item trong cart
    const invalidCartItems = cart.filter((item) => {
      return (
        !item ||
        !item.id ||
        item.id === null ||
        item.id === undefined ||
        !item.quantity ||
        item.quantity === null ||
        item.quantity === undefined ||
        Number(item.quantity) <= 0 ||
        isNaN(Number(item.quantity))
      );
    });

    if (invalidCartItems.length > 0) {
      alert("Giỏ hàng có sản phẩm không hợp lệ! Vui lòng kiểm tra lại.");
      console.error("Invalid cart items:", invalidCartItems);
      return;
    }

    // Lưu thông tin đơn hàng vào sessionStorage
    const orderData = {
      restaurant: {
        id: finalRestaurantId.trim(),
        name: restaurantName || restaurantDetail?.restaurantName || "",
        address: restaurantDetail?.address || "",
      },
      cart: cart.map((item) => ({
        ...item,
        id: String(item.id).trim(),
        quantity: Number(item.quantity),
        price: Number(item.price) || 0,
        note: item.note ? String(item.note).trim() : "",
      })),
    };

    console.log("OrderData được lưu:", orderData);

    sessionStorage.setItem("orderData", JSON.stringify(orderData));
    console.log("Đơn hàng đã đặt:", orderData);

    // Navigate sang trang checkout
    navigate("/checkout");
  };

  const handleCategoryClick = (e, categoryName) => {
    e.preventDefault();
    const element = document.getElementById(categoryName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!restaurantDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Đang tải thông tin nhà hàng...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div>
          <img
            src={restaurantDetail?.banner}
            alt={`Banner nhà hàng ${restaurantDetail?.restaurantName}`}
            className="h-[30vh] w-full rounded-none object-cover"
          />
        </div>
        <div className="mx-auto px-60">
          <div className="flex flex-col gap-3 py-4">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold text-2xl">
                {restaurantDetail?.restaurantName}
              </h1>
              <div className="rounded-xl border border-gray-300 px-2 py-1">
                <button>Yêu thích</button>
              </div>
            </div>
            <p>{restaurantDetail?.address}</p>
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
                  className={`transition-transform ${
                    showSlider ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {showSlider && <RelatedRestaurants category="juice" />}
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
              {restaurantDetail?.foodCategories?.map((category, index) => {
                const totalProducts = category.foods.length;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-300 py-1 uppercase flex gap-1 px-4 cursor-pointer"
                    onClick={(e) => handleCategoryClick(e, category.name)}
                  >
                    <span className="hover:text-blue-600">
                      {category.name}
                      <strong className="text-blue-500 bg-gray-200 rounded-full px-2 ml-1">
                        {totalProducts}
                      </strong>
                    </span>
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
                data={restaurantDetail.foodCategories}
                onAddToCart={addToCart}
                onProductClick={handleProductClick}
              />
            </div>

            {/* Khối chiếm 25% */}
            <div className="flex-1 w-1/4 ml-4">
              <div className="">
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
                        <div className="flex justify-center bg-orange-400 rounded-lg m-4 cursor-pointer hover:scale-105 transition-transform">
                          <button className="p-2" type="submit">
                            Xem đơn hàng
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
                </div>
                <div>
                  <div className="w-full max-w-lg pt-4 mb-55">
                    <label
                      htmlFor="message"
                      className="block text-xs text-gray-600 uppercase mb-1"
                    >
                      Viết lời nhắn cho nhà hàng
                    </label>
                    <textarea
                      id="message"
                      value={note}
                      onChange={handleNoteChange}
                      rows="2"
                      className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 text-sm"
                      placeholder=""
                    ></textarea>
                    <br />
                    <div className="w-full max-w-lg my-2">
                      <label
                        htmlFor="message"
                        className="block text-xs text-gray-600 uppercase mb-1"
                      >
                        Size - bắt buộc
                      </label>

                      <div className="space-y-2">
                        {selectedProduct.foodOptions?.map((option) => (
                          <SizeCard
                            key={option.id}
                            sizeName={option.name}
                            price={option.price.toLocaleString()}
                            isDefault={selectedSize === option.name}
                            setSelectedSize={setSelectedSize}
                          />
                        ))}
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
                      (selectedProduct.foodOptions?.find(opt => opt.name === selectedSize)?.price || 0) * total
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
