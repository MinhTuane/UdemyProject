import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";


export default class CountryStore {

    /**
     *
     */
    constructor() {
       makeAutoObservable(this)
        
    }

    countryNames : String[] = [];
    loadingInitial =false;

    loadCountryNames=async() => {
        this.loadingInitial =true;
        try {
            const countryNames = await agent.CountryNames.list();
            runInAction(()=> {
                this.countryNames = countryNames;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(()=>{
                this.loadingInitial = false;
            })
        }
    }

    get countryOptions() {
        return this.countryNames.map(name => ({
            text: name,
            value : name
        }))
    }
}