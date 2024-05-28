import { makeAutoObservable, runInAction } from "mobx";
import { Material } from "../models/material";
import agent from "../api/agent";


export default class MaterialStore {

    constructor() {
        makeAutoObservable(this);
        
    }
    loadingInitial = false;
    materialRegister = new Map<string,Material>();

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
        this.materialRegister.set(material.id,material);
    }
}