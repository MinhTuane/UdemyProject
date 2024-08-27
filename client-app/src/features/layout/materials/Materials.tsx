import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import MaterialItem from "./MaterialItem";
import LoadingComponent from "../../../app/layout/loadingComponent";

export default observer(function Materials() {
    const {materialStore} = useStore();
    const { loadMaterials, materials,loadingInitial } = materialStore;

    useEffect(()=>{
        if(materials.size <=1) {
            loadMaterials();  
        }
    },[materialStore,materials.size])

    if(loadingInitial) return <LoadingComponent content="loading"/>

    return (
        Array.from(materials.values()).map(material => (
            <MaterialItem material={material}/>
        ))
    )
});