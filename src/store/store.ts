import {configureStore} from "@reduxjs/toolkit";
import {sidenavSlice} from "./ui";
import { MechanicInterface, MechanicSearchBarInterface, VehicleBrandInterface, VehicleBrandListInterface } from "../interfaces";
import { mechanicListSlice, mechanicSlice, vehicleBrandListSlice, vehicleBrandSlice } from "./modules/administration";

export interface StoreInterface {
    mechanicListSlice: MechanicSearchBarInterface,
    mechanicSlice : MechanicInterface,
    vehicleBrandListSlice: VehicleBrandListInterface,
    vehicleBrandSlice: VehicleBrandInterface
}

export const store = configureStore({
    reducer: {
        sideNav: sidenavSlice.reducer,
        mechanicList: mechanicListSlice.reducer,
        mechanic: mechanicSlice.reducer,
        vehicleBrandListSlice: vehicleBrandListSlice.reducer,
        vehicleBrandSlice: vehicleBrandSlice.reducer
    }
});

