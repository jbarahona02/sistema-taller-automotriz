import {Route, Routes} from "react-router-dom";
import {routesAdministration} from "./routesAdministration.ts";
import {Box} from "@mui/material";

export const AdministrationRoutes = () => {
    return (
        <Box sx={{
            height: '100%'
        }}>
            <Routes>
                {
                    routesAdministration.map(({Component, path}) => (
                        <Route
                            key={path}
                            path={path}
                            element={<Component/>}
                        />
                    ))
                }
            </Routes>
        </Box>
    )
}

export default AdministrationRoutes;
