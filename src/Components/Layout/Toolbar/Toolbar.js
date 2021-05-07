import React from "react";
import "../Layout.css";
import Auxiliary from "../../hoc/Auxiliary";
import Navigation from "./Navigation/Navigation";
import burgerLogo from "../../../assets/burger-logo.png";
import SideDrawer from "./Navigation/SideDrawer/SideDrawer";

class Toolbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toolBarClicked: false
        }
    }
    showToolbarOptions = ()=>{
        this.setState({
            toolBarClicked: true
        })
    }
    closeToolbarOptions = ()=>{
        this.setState({
            toolBarClicked :false
        });
    }
    render(){
       return(
           <Auxiliary>
                <header className="toolbar">
                    <button className="toolbarOptionsBtn" onClick={()=>this.showToolbarOptions()}>
                        <div></div>
                        <div></div> {/*button bars */}
                        <div></div>
                    </button>
                    <div className="logoContainer">
                        <img className="burgerLogo" src={burgerLogo} alt="Burger"/>
                    </div>
                    <SideDrawer handleSideBar={this.state.toolBarClicked} closeSideDrawer={this.closeToolbarOptions}/>

                    <Navigation />
                    
                </header>

               
            </Auxiliary>
        ) 
    }
    
}

export default Toolbar;