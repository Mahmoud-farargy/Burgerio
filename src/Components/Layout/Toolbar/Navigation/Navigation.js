import React from "react";
import '../../../Layout/Layout.css';
import NavigationItems  from "./NavigationItems/NavigationItems";


const Navigation = (props)=>{
    return( 
        <nav className="desktopOnly">
            <NavigationItems />
        </nav>
    )
}

export default Navigation;