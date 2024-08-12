import { makeAutoObservable, runInAction } from "mobx";
import { ProductionRecord } from "../models/productionRecord";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { ProductData } from "../models/productData";

export default class ProductionRecordStore {

    /**
     *
     */
    constructor() {
        makeAutoObservable(this);
    }
    loading =false;
    loadingInitial = false;
    productionRecords = new Map<string,ProductionRecord>();

    loadProductionRecords = async () => {
        this.loadingInitial = true;
        try {
            const productionRecords = await agent.ProductionRecords.list();

            runInAction(()=>{
                productionRecords.forEach(productionRecord => {
                    this.setproductionRecord(productionRecord);
                })
            })
            
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial =false;
        }
    }

    private setproductionRecord = (productionRecord : ProductionRecord) => {
        this.productionRecords.set(productionRecord.id!,productionRecord);
    }

    setInitialLoading(flag: boolean) {
        this.loadingInitial = flag;
    }

    createProductionRecord = async (productionRecord: ProductionRecord) => {
        this.loading =true;
        productionRecord.id = uuid();
        try {
            await agent.ProductionRecords.create(productionRecord);
            runInAction(() => {
                this.productionRecords.set(productionRecord.id, productionRecord)
                this.loading =false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading =false;
            })
        }
    }

    updateProductionRecord = async (productionRecord: ProductionRecord) => {
        this.loading = true;
        try {
            await agent.ProductionRecords.update(productionRecord);
            runInAction(() => {
                this.productionRecords.set(productionRecord.id!, productionRecord);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    deleteProductionRecord = async (id: string) => {
        this.setInitialLoading(true);
        try {
            await agent.ProductionRecords.delete(id);
            runInAction(() => {
                this.productionRecords.delete(id);
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }

    yearData = async (productData : ProductData) => {
        this.setInitialLoading(true);
        try {
            const chartData = await agent.ProductionRecords.year(productData);
            runInAction(() => {
                this.setInitialLoading(false);
            })
            return chartData;
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }

    monthData = async (productData : ProductData) => {
        this.setInitialLoading(true);
        try {
            const chartData = await agent.ProductionRecords.month(productData);
            runInAction(() => {
                this.setInitialLoading(false);
            })
            return chartData;
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }

    dayData = async (productData : ProductData) => {
        this.setInitialLoading(true);
        try {
            const chartData = await agent.ProductionRecords.day(productData);
            runInAction(() => {
                this.setInitialLoading(false);
            })
            return chartData;
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }
}