import React from "react";

const SideDrawerBackdrop =(props)=>{    
    return props.handleSideBar ? <div className="backdrop" onClick={props.closeSideDrawer}></div> :null
}


export default SideDrawerBackdrop;