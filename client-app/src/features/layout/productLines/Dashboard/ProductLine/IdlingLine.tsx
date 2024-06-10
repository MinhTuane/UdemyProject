import { useEffect } from "react";

import { useStore } from "../../../../../app/stores/store";
import ProductListItem from "../../../Product/ProductListItem";
import { observer } from "mobx-react-lite";

export default observer (function IdlingLine() {
    const { productStore } = useStore();
    const { loadProducts, products } = productStore;

    useEffect(()=>{
        if(products.size <=1) {
            loadProducts();
        }
    },[productStore,products.size])

    return (
        Array.from(products.values()).map(product => (
            <ProductListItem product={product}/>
        ))
    )
})