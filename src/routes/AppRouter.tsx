import {routes} from "./routes.ts";
import {Navigate, Route, Routes} from "react-router-dom";

export const AppRouter = () => {
    return (
        <Routes>
            {
                routes.map(({path, Module}) => (
                    <Route
                        key={path}
                        path={path}
                        element={<Module/>}
                    />
                ))
            }
            <Route path={'/*'} element={<Navigate to={routes[0].to} replace />} />
        </Routes>
    );
}
