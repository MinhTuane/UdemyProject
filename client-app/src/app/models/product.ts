
import { PurchaseOrder } from "./purchaseOrder";
import { ProductionRecord } from "./productionRecord"; 
import { Material } from "./material";

export interface Product {
    id: string;
    name: string;
    quantity: number;
    description: string;
    image?: any;
    price?: number;
    isProducing : boolean
    choseMaterials: Material[] | null;
    purchaseOrders?: PurchaseOrder[] | null;
    productionRecords?: ProductionRecord[] | null; 
}
