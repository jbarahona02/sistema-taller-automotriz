import {configureStore} from "@reduxjs/toolkit";
import {sidenavSlice} from "./ui";
import { MechanicInterface, MechanicSearchBarInterface } from "../interfaces";
import { mechanicListSlice, mechanicSlice } from "./modules/administration";

export interface StoreInterface {
    mechanicListSlice: MechanicSearchBarInterface,
    mechanicSlice : MechanicInterface
}

export const store = configureStore({
    reducer: {
        sideNav: sidenavSlice.reducer,
        mechanicList: mechanicListSlice.reducer,
        mechanic: mechanicSlice.reducer
    }
});

