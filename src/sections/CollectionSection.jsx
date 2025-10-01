import CategoryCard from "../components/MainContents/CategoryCard";
import FoodCard from "../components/MainContents/FoodCard";

export default function CollectionSection({title, cards, typeCard}) {
    return (
        <div className="mb-8 mx-[200px] mt-12">
            <h1 className="text-5xl mb-7">{title}</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((item, index) => (
                    typeCard 
                    ? <CategoryCard key={index}
                        {...item}
                        onclick={() => {console.log("key: " + index)}}
                      />
                    : <FoodCard key={index}
                        {...item}
                        onclick={() => {console.log("name: " + item.name)}}
                      />
                ))}
            </div>
        </div>
    );
}