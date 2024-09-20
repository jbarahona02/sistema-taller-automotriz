import { Moment } from "moment";
import { ClienteInterface } from "./cliente.interface";

export interface CotizacionInterface {
    cotCodigo: number;
    cotFechaCreacion : Moment | string;
    cotFechaVencimiento: Moment | string;
    cotVigente: boolean;
    cotSubtotal: number;
    cotDescuento: number;
    cotTotal: number;
    cliCodigo: number | null;
    cliente : ClienteInterface | null;
}

export interface CotizacionListInterface {
    content: CotizacionInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}


