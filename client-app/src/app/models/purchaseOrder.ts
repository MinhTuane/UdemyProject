import { Product } from "./product";

export interface PurchaseOrder {
    id: string,
    productId :string,
    product :Product,
    customer : string,
    quantity: number,
    contractDate : Date | null,
    exportDate : Date | null,
    exportCountry : string,
}