export interface User {
    id:string,
    username :string,
    displayName: string,
    token:string,
    image?:string,
    dateOfBirth : Date | null ,
    productLineId? : string,
    role: string,
    email : string,
    password : string
}

export interface UserFormValues {
    id?:string;
    email: string;
    password: string;
    displayName?:string;
    username?:string;
    role?:string;
    dateOfBirth?:Date | null;
}

export interface Photo {
    id :string,
    url : string,
    isMain:boolean
}
