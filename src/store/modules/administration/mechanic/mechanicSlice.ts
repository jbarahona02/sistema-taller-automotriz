import moment from "moment";
import { MechanicInterface } from "../../../../interfaces";
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
    emeCodigo: null,
    mecAniosExperiencia: 0,
    mecFechaNacimiento: moment(),
    especialidadMecanica: null
}

export const mechanicSlice = createSlice({
    name: 'mechanicSlice',
    initialState,
    reducers: {
        setMechanicResult: (state, {payload}: PayloadAction<MechanicInterface>) => {
            state.mecCodigo = payload.mecCodigo,
            state.mecDpi = payload.mecDpi,
            state.mecNombres = payload.mecNombres,
            state.mecApellidos = payload.mecApellidos,
            state.mecNit = payload.mecNit,
            state.mecTelefono = payload.mecTelefono,
            state.mecCorreo = payload.mecCorreo,
            state.mecFechaNacimiento = payload.mecFechaNacimiento,
            state.mecFechaContratacion = payload.mecFechaContratacion,
            state.mecAniosExperiencia = payload.mecAniosExperiencia,
            state.emeCodigo = payload.emeCodigo
            state.especialidadMecanica = payload.especialidadMecanica
        },
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
            state.emeCodigo = null,
            state.especialidadMecanica = null
        }
    }
});

export const {
    setMechanicResult,
    cleanMechanicData
} = mechanicSlice.actions;