import ProductCategory from './ProductCategory';

export default function ProductList({ onAddToCart, onProductClick, data }) {
    return (
        <div>
            {data.map((category, index) => (
                <ProductCategory
                    key={index}
                    category={category}
                    onAddToCart={onAddToCart} //Truyền từ cha
                    onProductClick={onProductClick}
                />
            ))}
        </div>
    );
}