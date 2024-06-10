import { makeAutoObservable, runInAction } from "mobx";
import { Material } from "../models/material";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';


export default class MaterialStore {

    constructor() {
        makeAutoObservable(this);
        
    }
    loadingInitial = false;
    materials = new Map<string,Material>();

    loadMaterials = async () => {
        this.loadingInitial = true;
        try {
            const materials = await agent.Materials.list();

            runInAction(()=>{
                materials.forEach(material => {
                    this.setMaterial(material);
                })
            })
            
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial =false;
        }
    }

    private setMaterial = (material : Material) => {
        this.materials.set(material.id,material);
    }

    setInitialLoading(flag: boolean) {
        this.loadingInitial = flag;
    }

    createMaterial = async (material: Material) => {
        this.setInitialLoading(true);
        material.id = uuid();
        try {
            await agent.Materials.create(material);
            runInAction(() => {
                this.materials.set(material.id, material)
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }

    updateProductLine = async (material: Material) => {
        this.setInitialLoading(true);
        try {
            await agent.Materials.update(material);
            runInAction(() => {
                this.materials.set(material.id, material);
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }
    deleteActivity = async (id: string) => {
        this.setInitialLoading(true);
        try {
            await agent.Materials.delete(id);
            runInAction(() => {
                this.materials.delete(id);
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }
}