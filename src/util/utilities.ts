import {Item} from "../interfaces";
import Swal from "sweetalert2";


export class Utilities {

    static generateItems = (content: any[], keys: Item): Item[] => {
        const items: Item[] = [];
        content.forEach((itemContent) => {
            const item: Item = {
                pairs : Object.entries(keys).map(([key, value]) => ({ key, value }))
            }
            items.push(item);
        });
        return items;
    }

    static successAlarm = async (text: string) => {
        await Swal.fire({
            title: 'Éxito',
            text,
            icon: 'success'
        })
    }

    static errorAlarm = async (text: string) => {
        await Swal.fire({
            title: 'Error',
            text,
            icon: 'error'
        })
    }

    static warningAlarm = async (title: string): Promise<boolean> => {
        const result = await Swal.fire({
            title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#689f38',
            confirmButtonText: 'Confirmar',
            cancelButtonColor: "#FF0000FF",
            cancelButtonText: 'Cancelar',
        });
        return result.isConfirmed;
    }

    static formatNumber = (value: number): string => {
        if (value === null) {
            throw new Error('Value is required');
        }

        return Intl.NumberFormat().format(value);
    };

    static formatDecimal = (value: number): string => {
        if (value === null) {
            throw new Error('Value is required');
        }

        return Intl.NumberFormat('es-GT', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        }).format(value);
    }

    static formatCurrency = (
        value: number | null,
        locale: string = 'es-GT',
        currency: string = 'GTQ',
    ): string => {
        if (value === null) {
            throw new Error('Value is required');
        }

        return Intl.NumberFormat(locale, {
            currencyDisplay: 'narrowSymbol',
            style: 'currency',
            currency,
        }).format(value);
    };

    static capitalizeFirstLetter = (text : string ): string => text.substring(0,1).toUpperCase() + text.substring(1,text.length).toLowerCase();
}
