import { makeAutoObservable, runInAction } from "mobx";
import { ProductLine } from "../models/productLine";
import agent from "../api/agent";

export default class ProductLineStore {

    constructor() {
        makeAutoObservable(this);
        
    }

    loadingInitial = false;
    productLines= new Map<string,ProductLine>();

    loadProductLines = async()=>{
        this.loadingInitial = true;

        try {
            const productLines = await agent.ProductLines.list();
            console.log(productLines);
            
            runInAction(()=>{
                productLines.forEach(productLine =>{
                    this.setProductLine(productLine)
                })
                console.log(this.productLines);
                
            })
            this.loadingInitial=false;
        } catch (error) {
            this.loadingInitial = false;
        }
    }
    
    setProductLine(productLine: ProductLine) {
        this.productLines.set(productLine.id,productLine)
    }
}