import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../models/product";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
export default class ProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    loadingInitial = false;
    products = new Map<string, Product>();
    selectedProduct: Product | undefined = undefined;

    get productOptions() {
        const options = Array.from(this.products.values()).map(product => ({
            text: `${product.name} - ${product.description}`,
            value: product.id
        }))
        return options
    }

    loadProducts = async () => {
        this.setInitialLoading(true);

        try {
            const products = await agent.Products.list();
            runInAction(() => {
                products.forEach(product => {
                    this.setProduct(product)
                })
                this.setInitialLoading(false);
            })

        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }
    setInitialLoading(flag: boolean) {
        this.loadingInitial = flag;
    }

    setProduct(product: Product) {
        this.products.set(product.id, product)
    }

    createProduct = async (product: Product) => {
        this.setInitialLoading(true);
        product.id = uuid();
        try {
            await agent.Products.create(product);
            runInAction(() => {
                this.products.set(product.id, product)
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }

    updateProduct = async (product: Product) => {
        this.setInitialLoading(true);
        try {
            await agent.Products.update(product);
            runInAction(() => {
                this.products.set(product.id, product);
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }
    deleteProduct = async (id: string) => {
        this.setInitialLoading(true);
        try {
            await agent.Products.delete(id);
            runInAction(() => {
                this.products.delete(id);
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }

    private getProduct = (id: string) => {
        return this.products.get(id);
    }

    loadProduct = async (id: string) => {
        let product = this.getProduct(id);
        if (product) {
            this.selectedProduct = product;
            return product;
        }
        else {
            this.setInitialLoading(true);
            try {
                product = await agent.Products.details(id);
                this.setProduct(product);
                runInAction(()=>this.selectedProduct = product);
                this.setInitialLoading(false);
                return product;
            } catch (error) {
                console.log(error);
                this.setInitialLoading(false);
            }
        }
    }
    
    get ProductionByDate() {
        if (!this.selectedProduct || !this.selectedProduct.productionRecords) {
            return new Map(); // Return an empty map or handle null/undefined case
        }

        // Calculate production by date
        const productionByDate = this.selectedProduct.productionRecords.reduce((accumulator, record) => {
            const dateKey = new Date(record.date).getDate();
            if (!accumulator.has(dateKey)) {
                accumulator.set(dateKey, 0);
            }
            accumulator.set(dateKey, accumulator.get(dateKey)! + record.quantityProduced);
            return accumulator;
        }, new Map<number, number>());

        return productionByDate;
    }

    get ProductionByHourToday() {
        if (!this.selectedProduct || !this.selectedProduct.productionRecords) {
            return []; 
        }
    
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime();
    
        // Filter production records to include only those from today
        const todayRecords = this.selectedProduct.productionRecords.filter(record => {
            const recordDate = new Date(record.date).getTime();
            return recordDate >= todayStart && recordDate < todayEnd;
        });
    
        // Calculate production by hour for today
        const productionByHourToday = Object.entries(
            todayRecords.reduce((accumulator, record) => {
                const hour = new Date(record.date).getHours();
                accumulator[hour] = accumulator[hour] ? accumulator[hour] + record.quantityProduced : record.quantityProduced;
                return accumulator;
            }, {} as {[key : number]:number})
        );
    
        return productionByHourToday;
    }
}