import { makeAutoObservable, runInAction } from "mobx";
import { ProductLine } from "../models/productLine";
import agent from "../api/agent";

export default class ProductLineStore {

    constructor() {
        makeAutoObservable(this);
        
    }

    loadingInitial = false;
    productLines= new Map<string,ProductLine>();
    choosingLine : ProductLine | null = null;

    loadProductLines = async()=>{
        this.setInitialLoading(true);

        try {
            const productLines = await agent.ProductLines.list();
            console.log(productLines);
            
            runInAction(()=>{
                productLines.forEach(productLine =>{
                    this.setProductLine(productLine)
                })
                console.log(this.productLines);
                if(this.choosingLine == undefined) {
                    this.setChoosingLine(productLines[0])
                }
            })
            this.setInitialLoading(false);
        } catch (error) {
            this.setInitialLoading(false);
        }
    }

    get productLineByStatus() {
        return Array.from(this.productLines.values())
        .sort((a,b) => a.title!.localeCompare(b.title!));
    }
    
    get groupedLineStatus() {
        return Object.entries(
            this.productLineByStatus.reduce((productLines,productLine)=>{
                const status = productLine.status
                productLines[status] = productLines[status] ? [...productLines[status],productLine] : [productLine];
                return productLines;
            },{} as {[key:string]:ProductLine[]})
            
        )
    }

    setProductLine(productLine: ProductLine) {
        this.productLines.set(productLine.id,productLine)
    }

    setInitialLoading(flag:boolean) {
        this.loadingInitial = flag;
    }

    setChoosingLine=(productLine : ProductLine)=> {
         this.choosingLine = productLine;
    }
}