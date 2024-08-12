import { Company } from "./company";
import { Product } from "./product";

export interface PurchaseOrder {
    id: string,
    productId :string,
    product? :Product | null,
    companyId : string,
    company?:Company | null,
    quantity: number,
    contractDate : Date | null,
    exportDate : Date | null,
    exportCountry : string,
    isDelivered : boolean
}