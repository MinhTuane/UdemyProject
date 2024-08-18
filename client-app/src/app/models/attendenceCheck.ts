import { User } from "./user";

export interface AttendenceCheck {
    id:string,
    userId:string,
    workStatus : string,
    date: Date | null,
    user?: User | null
}