
export default function CategoryCard({ name, image, title, onclick }) {
    return (
        <div className="relative rounded-xl overflow-hidden cursor-pointer transition-transform 
            duration-300 ease-in-out w-[260px] h-[150px]hover:scale-[1.02]"
            onClick={onclick} >
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover block"
            />
            <div className="absolute inset-x-0 bottom-0 p-4bg-gradient-to-t from-black/70 via-transparent">
                <span className="text-white text-base font-bold drop-shadow-lg ">
                    {title}
                </span>
            </div>
        </div>
    );
}