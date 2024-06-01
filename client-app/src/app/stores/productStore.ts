import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../models/product";
import agent from "../api/agent";

export default class ProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    loadingInitial = false;
    products= new Map<string,Product>();

    loadProductLines = async()=>{
        this.setInitialLoading(true);

        try {
            const products = await agent.Products.list();
           
            
            runInAction(()=>{
                products.forEach(product =>{
                    this.setProduct(product)
                })
            })
            this.setInitialLoading(false);
        } catch (error) {
            this.setInitialLoading(false);
        }
    }
    setInitialLoading(flag:boolean) {
        this.loadingInitial = flag;
    }

    setProduct(product: Product) {
        this.products.set(product.id,product)
    }
}