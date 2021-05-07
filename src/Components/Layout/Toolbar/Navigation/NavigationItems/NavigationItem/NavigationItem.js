import React from "react";
import "../../../../../Layout/Layout.css";
import {NavLink} from 'react-router-dom';

const NavigationItems = (props)=>{
    return(                                         //activee is not used, it's here just for reference 
        <li className="naviItem"><NavLink exact to ={props.link} className={props.active ? "activee" : null}>{props.children}</NavLink></li>
    )
}


export default NavigationItems;