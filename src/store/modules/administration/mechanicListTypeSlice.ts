import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Paging, MechanicInterface, MechanicSearchBarInterface} from "../../../interfaces";
import { Utilities } from "../../../util";

const initialState : MechanicSearchBarInterface = {
    mecDpi: "",
    mecNombres: "",
    mecApellidos: "",
    mecSalario: 0,
    mechanics: [],
    page: {
        hasNext: false,
        hasPrevious: false,
        totalPageCount: 0,
        totalItemCount: 0,
        content: [],
        currentPage: 0,
        pageSize: 0
    },
    items: [],
    params: {
        search: '',
        page: 0
    }
}

export const mechanicListSlice = createSlice({
    name: "mechanicListSlice",
    initialState,
    reducers: {
        setMechanicPageResult:(state, {payload}: PayloadAction<Paging<MechanicInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                pairs:  Object.entries(payload).map(([key, value]) => ({ key, value }))
            });
        },

        setMechanics: (state, {payload}: PayloadAction<{mechanics: MechanicInterface[] | null }> ) => {
            if (!payload.mechanics) {
                return;
            }

            state.mechanics = payload.mechanics;
        },
        setMechanicParams : (state, {payload} : PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});