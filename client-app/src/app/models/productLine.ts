import { Product } from "./product";

export interface ProductLine {
    id:string ,
    productId?:string,
    product? : Product,
    title : string,
    status : string,
}
