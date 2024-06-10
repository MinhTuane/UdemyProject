import { makeAutoObservable, runInAction } from "mobx";
import { PurchaseOrder } from "../models/purchaseOrder";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';


export class PurchaseOrderStore {

    purchaseOrders = new Map<string, PurchaseOrder>();
    loadingInitial: boolean = false;
    loading : boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    loadPurchaseOrders = async () => {
        this.setLoadingInitial(true);
        try {
            var purchaseOrders = await agent.PurchaseOrders.list();
            runInAction(() => {
                purchaseOrders.forEach(purchaseOrder => {
                    this.setPurchaseOrder(purchaseOrder);
                    this.setLoadingInitial(false);
                })
            })
        } catch (error) {
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    setLoadingInitial(flag: boolean) {
        this.loadingInitial = flag;
    }

    setPurchaseOrder(purchaseOrder: PurchaseOrder) {
        this.purchaseOrders.set(purchaseOrder.id, purchaseOrder);
    }

    loadPurchaseOrder = async (id: string) => {
        this.setLoadingInitial(true);
        const purchaseOrder = this.getPurchaseOrder(id);
        if (purchaseOrder) 
            { 
                this.setLoadingInitial(false); 
                return purchaseOrder 
            }
        else {
            try {
                this.setLoadingInitial(false);
                const purchaseOrder = await agent.PurchaseOrders.details(id);
                runInAction(()=>this.setLoadingInitial(false))
                return purchaseOrder;
            } catch (error) {
                runInAction(()=>this.setLoadingInitial(false))
            }
        }
    }

    private getPurchaseOrder(id: string) {
        return this.purchaseOrders.get(id);
    }

    createPurchaseOrder = async (purchaseOrder: PurchaseOrder) => {
        this.loading = true;
        purchaseOrder.id = uuid();
        try {
            await agent.PurchaseOrders.create(purchaseOrder);
            runInAction(() => {
                this.purchaseOrders.set(purchaseOrder.id, purchaseOrder)
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updatePurchaseOrder = async (purchaseOrder: PurchaseOrder) => {
        this.loading = true;
        try {
            await agent.PurchaseOrders.update(purchaseOrder);
            runInAction(() => {
                this.purchaseOrders.set(purchaseOrder.id, purchaseOrder);
                
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deletePurchaseOrder = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.purchaseOrders.delete(id);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}