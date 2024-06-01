import { ProductLine } from "../../../../app/models/productLine";
import { useStore } from "../../../../app/stores/store"
import ProductLineListItem from "./ListItem";

export default function ProductLineList() {
    const {productLineStore} = useStore();

    const {productLines} = productLineStore;
    
    return (
        <>
            {
                Array.from(productLines.values()).map((productLine : ProductLine)=>(
                    <ProductLineListItem productLine={productLine}/>
                )
                    
                )
            }
        </>
    )
}