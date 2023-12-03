import { createContext, useContext } from "react";
import AppStore from "./AppStore";

// interfejs
// interface Store{
//     carStore: CarStore
// }

// obiekt typu Store z inicjalizacją 
// export const store: Store = {
export const store = {
    appStore: new AppStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}

