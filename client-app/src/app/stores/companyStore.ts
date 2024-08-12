import { makeAutoObservable, runInAction } from "mobx";
import { Company } from "../models/company";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class CompanyStore {
    /**
     *
     */
    constructor() {
        makeAutoObservable(this);
        
    }
    loading = false;
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

    loadCompany = async (id: string) => {
        let company = this.getCompany(id);
        if (company) {
            return company;
        }
        else {
            this.setLoadingInitial(true);
            try {
                company = await agent.Companies.details(id);
                this.setCompany(company);
                this.setLoadingInitial(false);
                return company;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setCompany = (company: Company) => {
        
        this.companies.set(company.id, company);
    }

    private getCompany = (id: string) => {
        return this.companies.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCompany = async (company: Company) => {
        this.loading = true;
        company.id = uuid();
        try {
            await agent.Companies.create(company);
            runInAction(() => {
                this.companies.set(company.id, company)
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateCompany = async (company: Company) => {
        this.loading = true;
        try {
            await agent.Companies.update(company);
            runInAction(() => {
                this.companies.set(company.id, company);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteCompany = async (id: string) => {
        this.loading = true;
        try {
            await agent.Companies.delete(id);
            runInAction(() => {
                this.companies.delete(id);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}