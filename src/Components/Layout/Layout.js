import React, {Suspense}from "react";
import  "../Layout/Layout.css";
import Toolbar from "./Toolbar/Toolbar";
import {Route, Switch } from "react-router-dom";
import Checkout from "../Burger Builder/Checkout/Checkout";
// import MainBurger from "../Burger Builder/BurgerBuilder";
import Auth from "../hoc/Auth/Auth";
import Notification from "../hoc/Notifications/Notification";
import {connect} from "react-redux";
const MainBurger = React.lazy(()=> import("../Burger Builder/BurgerBuilder")); //imports component using lazy loading (Using "Suspense" component around your component is required)
const OrderList  = React.lazy(()=> import("../../Containers/OrderList/OrderList"));
const Layout = (props)=>{                                                   //known also as Asynchronous component
    return(  //"BrowserRouter" and "Route" components must be mentioned only ONCE in your app code
        <React.Fragment> {/*A higher order component is required when using "Suspense"*/}
                {props.notify ? <Notification  /> : null}
                <Toolbar />  {/*Toolbar exists in every page*/}
                            {/* Route lets you render a different page dynamically according to path */}
                            {/* exact makes this component load only when this route is choosen and not loaded in all routes */}
            <Switch>
                <Suspense fallback={<div style={{height:"100vh", width:"100%"}}><div id="loading"></div></div>}>
                    <Route path="/" exact component={MainBurger}/>        {/*Another way to route component is to use component property instead of render method*/}
                    <Route path="/Auth" exact component={Auth} />
                    <Route path="/checkout"component={Checkout}/>
                    <Route path="/orders" exact component={OrderList}/>
                </Suspense>
                  <Route render={()=> <h1 className="error404">Not Found</h1>} />  {/* This catches any 404 error cases */} 
            </Switch>
            
           
        </React.Fragment>
        
    )
}

const mapStateToProps = state=>{
    return{
        notify: state.notification.popUpMsg
    }
}
export default connect(mapStateToProps)(Layout);
//this is a higher order component which is wrapped around "BurgerBuilder" component