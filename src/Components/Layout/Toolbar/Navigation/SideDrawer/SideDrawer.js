import React from "react";  //SideDrawer for small devices only
import burgerLogo from "../../../../../assets/burger-logo.png";
import "../../../../Layout/Layout.css"
import NavigationItems from "../NavigationItems/NavigationItems";
import SideDrawerBackdrop from "../../../../Burger/OrderBtn/Backdrop/SideDrawerBackdrop";
const SideDrawer = (props)=>{
    var handleMysideBar = props.handleSideBar;
    return(
        <section>
            <SideDrawerBackdrop handleSideBar={props.handleSideBar} closeSideDrawer={props.closeSideDrawer}/> {/*  (nav transparent layout) */}
            <div className="sideDrawer"
            style={{
            transform: handleMysideBar ? "translateX(0)" : "translateX(-100%)",
            opacity: handleMysideBar ?  "1" : "0",
            display: handleMysideBar ? "block": "none",
            transition: "all 1s linear"
            }}>
                
                <img className="burgerPic" src={burgerLogo} alt="Burger" />
            <nav>
                <NavigationItems />
            </nav>
            
            </div>
        </section>
    )
}

export default SideDrawer;