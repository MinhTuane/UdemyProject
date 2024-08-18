import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import MaterialStore from "./materialStore";
import ProductLineStore from "./productLineStore";
import ProductStore from "./productStore";
import { PurchaseOrderStore } from "./purchaseOrderStore";
import CountryStore from "./countryStore";
import CompanyStore from "./companyStore";
import ProductionRecordStore from "./productionRecordStore";
import AdminStore from "./adminStore";
import AttendenceCheckStore from "./attendenceCheckStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";


interface Store {
    activityStore : ActivityStore;
    commonStore : CommonStore;
    userStore: UserStore;
    materialStore : MaterialStore;
    productLineStore : ProductLineStore;
    productStore : ProductStore;
    purchaseOrderStore : PurchaseOrderStore;
    countryStore : CountryStore;
    companyStore : CompanyStore;
    productionRecordStore : ProductionRecordStore;
    adminStore : AdminStore;
    attendenceCheckStore : AttendenceCheckStore;
    modalStore : ModalStore;
    profileStore : ProfileStore;
}

export const store : Store = {
    activityStore : new ActivityStore(),
    commonStore : new CommonStore(),
    userStore : new UserStore(),
    materialStore : new MaterialStore(),
    productLineStore : new ProductLineStore(),
    productStore : new ProductStore(),
    purchaseOrderStore : new PurchaseOrderStore(),
    countryStore : new CountryStore(),
    companyStore : new CompanyStore(),
    productionRecordStore : new ProductionRecordStore(),
    adminStore : new AdminStore(),
    attendenceCheckStore : new AttendenceCheckStore(),
    modalStore : new ModalStore(),
    profileStore : new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}