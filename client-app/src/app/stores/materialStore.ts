import { makeAutoObservable, runInAction } from "mobx";
import { Material } from "../models/material";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';


export default class MaterialStore {

    constructor() {
        makeAutoObservable(this);
        
    }
    loading = false;
    loadingInitial = false;
    materials = new Map<string,Material>();
    selectedMaterial : Material | undefined = undefined;

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

    loadMaterial = async (id: string) => {
        let material = this.getMaterial(id);
        if (material) {
            this.selectedMaterial = material;
            return material;
        }
        else {
            this.setInitialLoading(true);
            try {
                material = await agent.Materials.details(id);
                this.setMaterial(material);
                runInAction(()=>this.selectedMaterial = material);
                this.setInitialLoading(false);
                return material;
            } catch (error) {
                console.log(error);
                this.setInitialLoading(false);
            }
        }
    }

    private setMaterial = (material : Material) => {
        this.materials.set(material.id,material);
    }

    private getMaterial = (id: string) => {
        return this.materials.get(id);
    }

    setInitialLoading(flag: boolean) {
        this.loadingInitial = flag;
    }

    createMaterial = async (material: Material) => {
        this.loading =true;
        material.id = uuid();
        try {
            await agent.Materials.create(material);
            runInAction(() => {
                this.materials.set(material.id, material)
                this.loading =false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading =false;
            })
        }
    }

    updateMaterial = async (material: Material) => {
        this.loading = true;
        try {
            await agent.Materials.update(material);
            runInAction(() => {
                this.materials.set(material.id, material);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteMaterial = async (id: string) => {
        this.loading = true;
        try {
            await agent.Materials.delete(id);
            runInAction(() => {
                this.materials.delete(id);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}