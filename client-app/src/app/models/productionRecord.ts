import { Product } from "./product";

export interface ProductionRecord {
    id: string,
    date: string; 
    quantityProduced: number;
    productId:string;
    product: Product
}
