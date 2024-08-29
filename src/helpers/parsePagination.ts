import axios, { AxiosHeaders, RawAxiosResponseHeaders } from "axios";
import { Paging } from "../interfaces";

interface LowerCaseKeys {
    [x: string]: number | string | [] | boolean | null;
}

export const parsePagination = <T>(
    headers: RawAxiosResponseHeaders | (RawAxiosResponseHeaders & AxiosHeaders)
): Paging<T> => {
    const lowercaseKeys: LowerCaseKeys = {};

    try {
        // Verifica que el header x-pagination exista
        if (!headers['x-pagination']) {
            throw new Error("Header 'x-pagination' is missing");
        }

        const body = JSON.parse(headers['x-pagination']);

        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                const lowercaseKey = key.charAt(0).toLowerCase() + key.slice(1);
                lowercaseKeys[lowercaseKey] = body[key];
            }
        }

        lowercaseKeys['content'] = [];

        return {
            ...lowercaseKeys,
        } as Paging<T>;

    } catch (error) {
        console.error("Error parsing pagination headers:", error);
        return {
            content: [],
            totalElements: 0,
            totalPages: 0,
            firstPage: true,
            lastPage: false,
        } as Paging<T>;
    }
};
