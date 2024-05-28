import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import MaterialStore from "./materialStore";
import ProductLineStore from "./productLineStore";


interface Store {
    activityStore : ActivityStore;
    commonStore : CommonStore;
    userStore: UserStore;
    materialStore : MaterialStore;
    productLineStore : ProductLineStore;
}

export const store : Store = {
    activityStore : new ActivityStore(),
    commonStore : new CommonStore(),
    userStore : new UserStore(),
    materialStore : new MaterialStore(),
    productLineStore : new ProductLineStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}