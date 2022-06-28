import React, { useState } from "react";
import {
   Drawer
} from "@material-ui/core";
import SideList from '../SideBar/sidelist';
import Home from './../../assets/images/home.svg';
import Notification from './../../assets/images/notification.svg';
import Setting from './../../assets/images/setting.svg';
import Org from './../../assets/images/org.svg';
import Profile from './../../assets/images/profile.svg';
import Bookmark from './../../assets/images/bookmark.svg';



const SideBar = (props) => {
    const [menuItems, setItems] = useState([{ name: "Home", img: Home, link: "/" }, { name: "Notifications", img: Notification, onClick:`${props.notification}` }, {
        name: "Settings", img: Setting, link: "/settings"
    }, { name: "Organizations", img: Org, link: "/organizations" }, { name: " Profile", img: Profile, link: "/profile" }, , {
        name: "Bookmarks", img: Bookmark, link: "/bookmarks" }]);
    return (
        <>
            {window.innerWidth <= 750 && <Drawer open={props.open} anchor="right" onClose={props.toggleSlider}>
               <SideList menuItems={menuItems} />
            </Drawer>
            }

            {window.innerWidth > 750 &&
               <SideList menuItems={menuItems} />
            }
    </>
    )

};

export default SideBar;