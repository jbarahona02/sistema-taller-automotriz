import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {AutoAwesomeMotion, ExpandLess, ExpandMore} from "@mui/icons-material";
import {SideNavGroupInterface} from "../interfaces";
import {SideNavItem} from "./";
import {useState} from "react";
import {useSelector} from "react-redux";


export const SideNavGroup = ({moduleName, items}: SideNavGroupInterface) => {

    const [collapsable, setLocalCollapsable] = useState(false);
    const sideNav = useSelector(state => state.sideNav);


    const handleCollapse = () => {
        setLocalCollapsable(prevState => !prevState)
    };

    return (
        <List component={'nav'} sx={{
            backgroundColor: 'rgb(255,255,255, 0.1)',
            borderRadius: 5,
            m: 1
        }}>
            <ListItemButton sx={{display: 'flex'}} onClick={handleCollapse} disableRipple>
                <AutoAwesomeMotion sx={{
                    marginRight: '1rem'
                }}/>
                <ListItemText hidden={sideNav.collapsed} primary={moduleName}/>
                <ListItemIcon
                    hidden={sideNav.collapsed}
                    sx={{justifyContent: 'end'}}>
                    {
                        collapsable
                            ? <ExpandLess sx={{color: 'white'}}/>
                            : <ExpandMore sx={{color: 'white'}}/>
                    }
                </ListItemIcon>
            </ListItemButton>

            <Collapse in={collapsable} timeout={'auto'} unmountOnExit>
                <List component={'div'}>
                    {
                        items.map((item) => (
                            <SideNavItem key={item.to} {...item} />
                        ))
                    }
                </List>
            </Collapse>
        </List>
    );
}
