import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import ProductItem from "./ProductItem";

export default observer(function Products() {
    const {productStore} = useStore();
    const { loadProducts, products,loadingInitial } = productStore;

    useEffect(()=>{
        if(products.size <=1) {
            loadProducts();  
        }
    },[productStore,products.size])

    if(loadingInitial) return <LoadingComponent content="loading"/>
    return (
        Array.from(products.values()).map(product => (
            <ProductItem product={product}/>
        ))
    )
});