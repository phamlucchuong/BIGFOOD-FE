export default function CategoryCard({ name, image, title, size = 'md', onClick }) {

    const sizeClasses = {
        sm: 'w-[210px] h-[130px]',
        md: 'w-[260px] h-[150px]',
    };

    return (
        <div
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-transform 
                duration-300 ease-in-out hover:scale-[1.02] ${sizeClasses[size]}`}
            onClick={onClick}
        >
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover block"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-transparent">
                <span className="text-white text-base font-bold drop-shadow-lg ">
                    {title}
                </span>
            </div>
        </div>
    );
}