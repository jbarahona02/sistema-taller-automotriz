import {configureStore} from "@reduxjs/toolkit";
import {sidenavSlice} from "./ui";
import { MechanicInterface, MechanicSearchBarInterface, TypeVehicleInterface, TypeVehicleListInterface, VehicleBrandInterface, VehicleBrandListInterface } from "../interfaces";
import { mechanicListSlice, mechanicSlice, typeVehicleListSlice, typeVehicleSlice, vehicleBrandListSlice, vehicleBrandSlice } from "./modules/administration";

export interface StoreInterface {
    mechanicListSlice: MechanicSearchBarInterface,
    mechanicSlice : MechanicInterface,
    vehicleBrandListSlice: VehicleBrandListInterface,
    vehicleBrandSlice: VehicleBrandInterface,
    typeVehicleListSlice: TypeVehicleListInterface,
    typeVehicleSlice: TypeVehicleInterface
}

export const store = configureStore({
    reducer: {
        sideNav: sidenavSlice.reducer,
        mechanicList: mechanicListSlice.reducer,
        mechanic: mechanicSlice.reducer,
        vehicleBrandListSlice: vehicleBrandListSlice.reducer,
        vehicleBrandSlice: vehicleBrandSlice.reducer,
        typeVehicleListSlice: typeVehicleListSlice.reducer,
        typeVehicleSlice: typeVehicleSlice.reducer
    }
});

