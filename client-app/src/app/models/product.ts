
export interface Product {
    id:string,
    name:string,
    quantity?:number,
    description:string,
    price?:number,
    materials:any | null
}