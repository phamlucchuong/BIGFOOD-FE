export default function CategoryCard({ item, size = 'md', onClick }) {

    const sizeClasses = {
        sm: 'w-[210px] h-[130px]',
        md: 'w-[260px] h-[150px]',
    };

    const image = {
        "Tất cả": "/src/assets/images/all-category.png",
        "Đồ Uống": "/src/assets/images/drink-category.png",
        "Món Á-Âu": "/src/assets/images/asia-eu-category.png",
        "Cơm": "/src/assets/images/rice-category.png",
        "Thức Ăn Nhanh": "/src/assets/images/fastFood-category.png",
    }

    return (
        <div
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-transform 
                duration-300 ease-in-out hover:scale-[1.02] ${sizeClasses[size]}`}
            onClick={onClick}
        >
            <img
                src={image[item.name]}
                alt={item.name}
                className="w-full h-full object-cover block"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-transparent">
                <span className="text-white text-base font-bold drop-shadow-lg ">
                    {item.name}
                </span>
            </div>
        </div>
    );
}