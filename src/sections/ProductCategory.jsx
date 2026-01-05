import ProductCard from "../components/common/cards/ProductCard";


export default function ProductCategory({ category, onAddToCart, onProductClick }) {
    return (
        <div className="mb-10">
            <h2 id={category.name} className="text-2xl font-bold mb-4 scroll-mt-24">{category.name}</h2>
            <div className="grid grid-cols-3 gap-4">
                {category.foods.map((food) => (
                    <ProductCard
                        key={food.id}
                        product={food}
                        onAddToCart={onAddToCart} //Truyền xuống
                        onProductClick={onProductClick}
                    />
                ))}
            </div>
        </div>
    );
}