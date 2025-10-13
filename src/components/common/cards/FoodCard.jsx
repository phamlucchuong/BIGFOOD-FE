export default function FoodCard({ image, name, address, rating, onClick }) {
    return (
        <div 
            onClick={onClick} 
            className="w-[260px] bg-white rounded-xl shadow overflow-hidden cursor-pointer hover:scale-105 transform transition mb-3"
        >
            {/* Ảnh + label + nút tim */}
            <div className="relative">
                <img src={image} alt={name} className="w-full h-40 object-cover" />

                {/* Label promo */}
                {/* <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    PROMO
                </span> */}

                {/* Nút tim */}
                <button onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ div cha
                    console.log("click heart");
                }} className="group absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-200">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-4 h-4 text-gray-600 transition-colors duration-200 group-hover:text-red-600"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.74 
                            0-3.255 1.015-4.062 2.475A4.688 4.688 0 008.25 
                            3.75C5.66 3.75 3.562 5.765 3.562 8.25c0 
                            7.22 8.438 11.25 8.438 11.25S21 
                            15.47 21 8.25z" 
                        />
                    </svg>
                </button>
            </div>

            {/* Thông tin */}
            <div className="p-2">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                    {name}
                </h3>
                <p className="text-sm mt-1 text-gray-500 line-clamp-1">
                    {address}
                </p>
                <div className="flex items-center text-sm text-gray-700 mt-1">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="mr-1">{rating.point}</span>
                    <span>({rating.count} đánh giá)</span>
                </div>
            </div>
        </div>
    );
}
