import React from "react";
import NavigationItem  from "./NavigationItem/NavigationItem";
import "../../../../Layout/Layout.css";
const NavigationItems = (props) =>{

    return(
        <ul className="naviItems"> 
                 {/* passes in "link" and "active" as props to NavigationItem */}
                 {/* active passes like this without equals to indicate it's a boolean true. */}
             <NavigationItem link="/"  >Burger Builder</NavigationItem>
             <NavigationItem link="/orders" >Orders</NavigationItem>
             <NavigationItem link="/Auth">Log In</NavigationItem>
        </ul>
    )
}



export default NavigationItems;