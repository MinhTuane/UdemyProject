import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error :ServerError | null | undefined = null
    token:string | null | undefined = null
    appLoaded = false;
    
    /**
     *
     */
    constructor() {
        makeAutoObservable(this);      
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken =(token:string | null) =>{
        if(token) localStorage.setItem('jwt',token)
            this.token=token
    }

    setApploaded =()=> {
        this.appLoaded =true;
    }
}