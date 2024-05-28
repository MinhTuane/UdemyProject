import { ListItemProps } from "semantic-ui-react";

export interface Product {
    name:string,
    quantity?:number,
    description:string,
    price?:number,
    materials:any | null
}