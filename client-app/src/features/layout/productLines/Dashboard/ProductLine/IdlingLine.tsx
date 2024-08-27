import { useEffect, useState } from "react";

import { useStore } from "../../../../../app/stores/store";

import { observer } from "mobx-react-lite";
import { Product } from "../../../../../app/models/product";
import ProductListItem from "./ProductListItem";

export default observer (function IdlingLine() {
    const { productStore } = useStore();
    const { loadProducts, products ,ProductProduce} = productStore;
    const [product,setProducts] = useState<Product[]>([]);
    useEffect(()=>{
        if(products.size <=1) {
            loadProducts();  
        }
        setProducts(ProductProduce);
    },[productStore,products.size])

    return (
        product.map(product => (
            <ProductListItem product={product}/>
        ))
    )
})