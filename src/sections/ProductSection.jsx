import data from '../dataSample/pickfood.json';
import ProductCategory from './ProductCategory';

export default function ProductList({ onAddToCart, onProductClick }) {
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