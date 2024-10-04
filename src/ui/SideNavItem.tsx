import {useNavigate} from "react-router-dom";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SidNavItemInterface} from "../interfaces";
import {useDispatch, useSelector} from "react-redux";
import {setOpenDialog} from '../store/modules/administration/report/reportSlice.ts';



export const SideNavItem = ({to, name, NavIcon}: SidNavItemInterface) => {

    const navigate = useNavigate();
    const sideNav = useSelector(state => state.sideNav);
    const dispatch = useDispatch();


    const onNavigate = () => {
        if (to.includes('report')) {
            dispatch(setOpenDialog(true));
        }
        navigate(to);
    }

    return (
        <ListItemButton sx={{
            pl: 3,
            backgroundColor: 'rgb(255,255,255, 0.1)',
            borderRadius: 5,
            paddingLeft: `${sideNav.collapsed ? '8px' : '16px'}`,
            m: 1
        }} onClick={onNavigate} disableRipple>
            <ListItemIcon>
                <NavIcon sx={{color: 'primary.light'}}/>
            </ListItemIcon>
            <ListItemText hidden={sideNav.collapsed} sx={{color: 'primary.light'}} primary={name}/>
        </ListItemButton>
    );
}
