import {Paging} from "../interfaces";
import axios, {AxiosHeaders, AxiosResponseHeaders, RawAxiosResponseHeaders} from "axios";

interface lowerCaseKeys {
    [x:string]: number | string | [] | boolean | null;
}
export const parsePagination = <T>(headers: axios.RawAxiosResponseHeaders | (axios.RawAxiosResponseHeaders & AxiosHeaders)): Paging<T> => {
    const body = JSON.parse(headers['x-pagination']);
    const lowercaseKeys: lowerCaseKeys = {};
    for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            const lowercaseKey = key.charAt(0).toLowerCase() + key.slice(1);
            lowercaseKeys[lowercaseKey] = body[key];
        }
    }

    lowercaseKeys['content'] = [];
    return {
        ...lowercaseKeys
    };
}
