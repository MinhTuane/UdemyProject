export interface User {
    username :string,
    displayname: string,
    token:string,
    image?:string,
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?:string;
    username?:string;
}

export interface AppUser {
    username :string,
    displayname: string,
    token:string,
    image?:string,
    dateOfBirth : string,
    productLineId? : string
}