import {lazy} from "react";
import {ADMIN_BASE_PATH} from "../util";
import {Module} from "../interfaces";

const LazyAdministratorModule = lazy(() => import('../modules/administration/routes/AdministrationRoutes.tsx'))

export const routes: Module[] = [
    {
        to: ADMIN_BASE_PATH,
        path: `${ADMIN_BASE_PATH}/*`,
        Module: LazyAdministratorModule
    }
];
