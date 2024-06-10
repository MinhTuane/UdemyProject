import { Product } from "./product";

export interface ProductLine {
    id:string,
    product? : Product,
    title : string,
    status : string,
}
