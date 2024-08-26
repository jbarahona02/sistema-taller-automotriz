import moment from "moment";
import { MechanicInterface } from "../../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MechanicInterface = {
    mecCodigo: 0,
    mecNombres: "",
    mecApellidos: "",
    mecDpi: "",
    mecTelefono: "",
    mecNit: "",
    mecSalario: 0,
    mecCorreo: "",
    mecFechaContratacion: moment(),
    mecCodigoEspecialidad: 0,
    mecAniosExperiencia: 0,
    mecFechaNacimiento: moment(),
    estado: true
}

export const mechanicSlice = createSlice({
    name: 'mechanic',
    initialState,
    reducers: {
        cleanMechanicData: (state) => {
            state.mecCodigo = 0,
            state.mecDpi = "",
            state.mecNombres = "", 
            state.mecApellidos = "", 
            state.mecNit = "",
            state.mecTelefono = "", 
            state.mecCorreo = "", 
            state.mecFechaNacimiento = moment(), 
            state.mecSalario = 0, 
            state.mecFechaContratacion = moment(),
            state.mecAniosExperiencia = 0,
            state.mecCodigoEspecialidad = 0, 
            state.estado = true 
        },
        setMechanic: (state, {payload} : PayloadAction<MechanicInterface>) => {
            state.mecCodigo = payload.mecCodigo,
            state.mecDpi = payload.mecDpi,
            state.mecNombres = payload.mecNombres, 
            state.mecApellidos = payload.mecApellidos, 
            state.mecNit = payload.mecNit,
            state.mecTelefono = payload.mecTelefono, 
            state.mecCorreo = payload.mecCorreo, 
            state.mecFechaNacimiento = moment( payload.mecFechaNacimiento,"DD-MMM-YY hh.mm.ss.SSSSSSSSS A")
            state.mecSalario = payload.mecSalario, 
            state.mecFechaContratacion = moment( payload.mecFechaContratacion,"DD-MMM-YY hh.mm.ss.SSSSSSSSS A");
            state.mecAniosExperiencia = payload.mecAniosExperiencia,
            state.mecCodigoEspecialidad = payload.mecCodigoEspecialidad, 
            state.estado = payload.estado 
        }
    }
});

export const {
    cleanMechanicData,
    setMechanic,
} = mechanicSlice.actions;