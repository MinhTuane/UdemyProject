import { Material } from "./material";
import { PurchaseOrder } from "./purchaseOrder";
import { ProductionRecord } from "./productionRecord"; 

export interface Product {
    id: string;
    name: string;
    quantity?: number;
    description: string;
    image?: any;
    price?: number;
    materials: Material[] | null;
    purchaseOrders?: PurchaseOrder[] | null;
    productionRecords?: ProductionRecord[] | null; 
}
