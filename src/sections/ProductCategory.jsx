import ProductCard from "../components/common/cards/ProductCard";


export default function ProductCategory({ category, onAddToCart, onProductClick }) {
    return (
        <div className="mb-10">
            <h2 id={category.categoryindex} className="text-2xl font-bold mb-4">{category.category}</h2>
            <div className="grid grid-cols-3 gap-4">
                {category.products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart} //Truyền xuống
                        onProductClick={onProductClick}
                    />
                ))}
            </div>
        </div>
    );
}