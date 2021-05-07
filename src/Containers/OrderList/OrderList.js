import React, {Component} from "react";
import Order from "./Order/Order";
import  "./OrderList.css";
import { isNull } from "util";
import axios from "axios";
import "../../Components/Layout/Layout.css";
class OrderList extends Component{
    constructor(props){
        super(props);
        this.state={
            fetchedData : {},
            isDataReceived: false,
            isLoading: true,
            isErrorFound: false,
            serverErrorMsg: ""
        }
    }
    componentDidMount(){
        axios.get("https://mahmoudvue.firebaseio.com/orders.json")
        .then(response=>{
        if(!isNull(response.data)){ //makes sure data received is not null
            const fetchedDataArray = []; 
            for( let key in response.data){ //extracts data from the server
                if(response.data){
                    this.setState({
                        isDataReceived: true, //ensures that data has been received to view it
                        isLoading: false, //plays animation
                        fetchedData: fetchedDataArray, //equalize received data with the state data
                        serverErrorMsg: ""  //removes any potential error messages
                    });
                }
                fetchedDataArray.push({
                    ...response.data[key], // pushes data to the array without caring about property names
                    id: key                 //or how many properties this object has
                }) //adds an id to each element
            }
        }

        }).catch(error=>{  //in case of any error
            this.setState({
                isLoading: false, //stops loading animation
                isDataReceived: false,  //ensures that no data has been received
                isErrorFound: true,  //ensures that an error has been found
                serverErrorMsg: error //prints this error to the UI
            })
        })
    }
    render(){
        var ordersOutput;
        if(this.state.isDataReceived){ //DO NOT VIEW ASYNCHRONOUS DATA BEFORE IT WAS LOADED FROM THE SERVER
                ordersOutput = (this.state.fetchedData.map(item=> (
                <Order key={item.id} date={item.date} ingredients={item.ingredients} price={item.price} styleClass="orderItem" extras ={item.extras}/>
            )))
            
        }
        if(this.state.isLoading){
            ordersOutput =(<div className="loading"></div>);
        }else if(navigator.onLine === false){
            ordersOutput =(<div className="alert alert-danger text-center"><div>You are offline now. please reconnect and try again!</div></div>);
                //if any error found, it prints it to the UI
        }else if(this.state.isErrorFound){
            ordersOutput =(<div className="alert alert-danger text-center"><h3 className="text-light text-center">{this.state.serverErrorMsg}</h3></div>)
        }
        return (
            <React.Fragment>
                <div className="ordersContainer">
                    <div className="orderCard">
                       <div>

                           {ordersOutput}

                        </div> 
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}

export default OrderList;