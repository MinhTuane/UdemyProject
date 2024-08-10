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
}