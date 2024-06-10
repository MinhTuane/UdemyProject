import { makeAutoObservable, runInAction } from "mobx";
import { Company } from "../models/company";
import agent from "../api/agent";

export default class CompanyStore {
    /**
     *
     */
    constructor() {
        makeAutoObservable(this);
        
    }

    companies = new Map<string,Company>();
    loadingInitial =false;

    loadCompanies= async () => {
        this.loadingInitial = true;
        try {
            var companies = await agent.Companies.list();
            runInAction(()=> {
                companies.forEach(company => {
                    this.companies.set(company.id,company);
                })
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(()=> {
                this.loadingInitial =false;
            })
        }
    }

    get companyOptions() {
        return Array.from(this.companies.values()).map(company => ({
            text: company.name,
            value: company.id
        }))
    }
}