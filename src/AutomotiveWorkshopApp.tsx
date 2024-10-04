import {AppTheme} from "./theme/AppTheme.tsx";
import {DrawerNav} from "./ui/components/DrawerNav.tsx";
import {Toaster} from 'react-hot-toast';


export const AutomotiveWorkshopApp = () => {

    return (
        <AppTheme>
            <Toaster position={'bottom-right'}/>
            <DrawerNav/>
        </AppTheme>
    );
}
