export interface User {
    id:string,
    username :string,
    displayName: string,
    token:string,
    image?:string,
    dateOfBirth : string,
    productLineId? : string,
    role: string
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?:string;
    username?:string;
    role?:string;
    dateOfBirth?:Date;
}

export interface Photo {
    id :string,
    url : string,
    isMain:boolean
}
