import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Layout from "./Components/Layout/Layout";
import "./Components/Layout/Layout.css";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import rootReducer from "./Store/reducer";


//      USING REDUX
const redux= require("redux"); //YOu can also use import redux from "redux"
const createStore= redux.createStore;  // or import {createStore} from "redux";
//Store
const store = createStore(rootReducer);
  // console.log(store.getState());
  //Subscription
  store.subscribe(()=>{ //subscribe gets triggered whenever any elements of the state change 
    console.log("[Subscription]", store.getState());
  });
  //Dispatching Action
  store.dispatch({type: "INC_COUNTER"});
  store.dispatch({type: "ADD_COUNTER", value: 10});
    //will result in {counter: 11} because "INC_COUNTER" will increase counter by one
                            //and "ADD_COUNTER" WILL ADD 10 to the counter
  

//-------end of Redux---------
class MainApp extends Component{
  constructor(props){
    super(props)
    this.state={
      test:"working"
    }
  }
  render(){
    return(
      <div className="Content">
        {/* <h1></h1> */}
        <Layout /> 
      </div>
    )
  }
}
const mainApp =(
  <Provider store={store}>
    
    <BrowserRouter>
          <MainApp/>
    </BrowserRouter>

    </Provider>
);

ReactDOM.render( mainApp,
  document.getElementById("App")); 
export default MainApp;