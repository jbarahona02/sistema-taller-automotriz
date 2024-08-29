import {SvgIconComponent} from "@mui/icons-material";
import { Moment } from "moment";
import {LazyExoticComponent, ReactElement} from "react";


export type SideNavType = SideNavGroupInterface[]

export interface SideNavGroupInterface {
    moduleName: string;
    items: SidNavItemInterface[]
}

export interface SidNavItemInterface {
    to: string;
    name: string;
    NavIcon: SvgIconComponent;
}

export interface ModuleRoute {
    path: string;
    Component: () => ReactElement | Element;
}

export interface Module {
    to: string;
    path: string;
    Module: LazyExoticComponent<() => ReactElement>
}

export interface Paging<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
    currentPage: number;
    pageSize: number;
}

export interface Item {
    pairs: KeyValuePair[];
    seeAction?: () => void;
    updateAction?:() => void;
    deleteAction?: () => void;
}


export interface ListComponentProps {
    searchLabel?: string;
    searchPlaceholder?: string;
    totalPageCount: number | undefined;
    hasNext: boolean;
    hasPrevious: boolean;
    useDelete: boolean;
    onSelectItem: (code: string | number) => void;
    onDeleteItem: (code: string | number) => void;
    onUpdateItem: (code: string | number) => void;
    onChangeSearch: (search: string) => void;
    onChangePage: (page: number, search: string) => void;
    items: Item[]
}

export interface SearchBarProps {
    options: SearchBarItem[],
    showToogle: boolean,
}

export interface SearchBarItem {
    isInput: boolean,
    isDatePicker: boolean,
    placeholder: string
}
type AllowedValueTypes = string | number | Date | Moment;

export interface KeyValuePair {
    key: string;
    value: AllowedValueTypes;
}
