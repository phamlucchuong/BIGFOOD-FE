import { food } from "../../../dataSample/food";
import CollectionSection from "../../../sections/CollectionSection";

export default function Collection(){
    return(
        <>
        <CollectionSection title="Thức ăn nhanh" cards={food} typeCard={false} />
        </>
    )
}