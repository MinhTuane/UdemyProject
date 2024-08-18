import { Photo, User } from "./user";

export interface IProfile {
    username :string,
    displayName: string,
    image?:string,
    dateOfBirth : string,
    productLineId? : string,
    role: string,
    photos? :Photo[]
}

export class Profile implements IProfile {
    constructor(user : User) {
        this.username = user.username;
        this.dateOfBirth = user.dateOfBirth;
        this.image = user.image;
        this.role = user.role;
        this.productLineId = user.productLineId;
        this.displayName = user.displayName;
    }

    username:string;
    displayName: string;
    image?: string | undefined;
    dateOfBirth: string;
    photos?: Photo[] | undefined;
    role: string;
    productLineId?: string | undefined;
}