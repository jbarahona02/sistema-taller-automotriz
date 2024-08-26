import {Box, Drawer} from "@mui/material";
import {AppRouter} from "../../routes/AppRouter.tsx";
import {SideNav} from "../SideNav.tsx";
import {useState} from "react";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {onChangeStatus} from "../../store/ui";

export const DrawerNav = ({drawerWidth = 270}) => {

    const [drawer, setDrawer] = useState(true);
    const sideNav = useSelector(state => state.sideNav);
    const dispatch = useDispatch();

    return (
        <Box sx={{display: 'flex', height: '100%'}}>
            <Box className={`btn-menu-action ${sideNav.collapsed ? 'btn-menu-action-rotate' : ''}`} sx={{
                left: sideNav.collapsed ? (70 - 18) : (drawerWidth - 18)
            }}>
                <button onClick={() => {
                    dispatch(onChangeStatus());
                }}>
                    <KeyboardArrowLeft/>
                </button>
            </Box>

            <Box
                component={'nav'}
                sx={{width: {sm: sideNav.collapsed ? 70 : drawerWidth}, flexShrink: {sm: 0}}}
            >
                <Drawer variant={'permanent'}
                        sx={{
                            display: {xs: 'block'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: !drawer ? 0 : sideNav.collapsed ? 70 : drawerWidth},
                        }}>
                    <SideNav/>
                </Drawer>

            </Box>

            <Box component={'main'} sx={{
                flexGrow: 1,
                pt: 1,
                pr: 3,
                pb: 3,
                pl: 3,
                height: '100%'
            }}>
                <AppRouter/>
            </Box>
        </Box>
    );
}
