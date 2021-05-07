import React ,{Component} from "react";
import Auxiliary from "../../hoc/Auxiliary";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from "react-router-dom";
import FormPage from "./CheckoutSummary/Form page/FormPage";
import axios from "axios";
import "./Checkout.css";
import "../../Layout/Layout.css";
import {connect} from "react-redux";
import * as actionTypes from "../../../Store/actionTypes";

class Checkout extends Component{
    constructor(props){
        // console.log(props);
        super(props);
        this.state={
            ingredients: this.props.ings, //pass ingredients and price from Redux store
            price: this.props.price,
            soda: this.props.soda,
            fries: this.props.fries,
            orderForm:{// orderForm will be moved from here to another component
                firstName:{value: "" , isValid: false, rules: /^\D{3,15}$/, inputErrorMsg: "For the fistname, Please enter between 3 and 15 character and not include numbers."},
                lastName:{value: "" , isValid: false, rules: /r/, inputErrorMsg: "For the lastname, enter between 3 and 15 characters."},
                email:{value: "" , isValid: false, rules: /r/, inputErrorMsg:"Enter a valid Email."},
                address: {value: "", isValid: false, rules: /r/, inputErrorMsg:"Enter a valid address."},
                postal:{value:  "",isValid: false, rules: /^\d{1,6}$/, inputErrorMsg:"Postal number should not exceed 6 characters."},
                phoneNum:{value: "" ,isValid: false, rules: /5/, inputErrorMsg:"Enter a valid phone number."},
                shipMethod:{value:"Fastest", isValid: true, rules: /[0-9a-zA-Z_]/}
            },
            continueBtnText: "Continue",
            isOrderCompleted: false,
            loading: false,
            errorMsg:  "",
            errorFound: false,
            todaysDate: "",
            isAnyInputInvalid: false,
            inputErrorMSGS: []
        }
    }
    componentDidMount =()=>{
        //---USING QUERY PARAMS TO RECEIVE PROPS INDIRECTLY---
        // const query = new URLSearchParams(this.props.location.search);
        // const newIngredients  = {};  //entries converts an object into an array which is enumberable
        // // console.log(newIngredients, this.props.location.search);
        // for (let param of query.entries()){ 
        //                 //property    //value 
        //                 //["Salad", "2"]
        //     newIngredients[param[0]] =+ param[1];   
        // }
        // this.setState({
        //     ingredients: newIngredients
        // })
    }
    cancelOrder = ()=>{
        this.props.history.goBack(); //goes back to the previous page
    }
    continueOrder= ()=>{
        this.props.history.replace("/checkout/makeOrder"); //redirects the page to "checkout/makeOrder" route
       this.setState({
           continueBtnText:"▼"
       })
        
    }

    inputHandler = (input, category)=>{
        let updatedForm = {
            ...this.state.orderForm
        }
        let updatedElement = {
            ...updatedForm[category]
        }
       let enteredValue = updatedElement.value = input.target.value.trim();
        

        let regex = updatedElement.rules;
        
        updatedElement.isValid = regex.test(enteredValue);

        updatedForm[category] = updatedElement;

        this.setState({
            orderForm : updatedForm
        })
        
        //---------Getting time/ date---------
        //adds date
      const dayInTheMonth = new Date().getDate();
      const month = new Date().getMonth()+1;
      const year = new Date().getFullYear();
      const hours = new Date().getHours();
      let hrs, mins, period;
      //handle hours
      
                if(hours >12){
                hrs = hours-12;
              }else{
                hrs = hours;
              }
              
              if(hours  === 0){
                hrs = 12;
              }
              const minutes = new Date().getMinutes();
              //handle minutes
              if(mins <9){
                mins = "0"+minutes;
              }else{
                mins = minutes;
              }
              //handle period
              if(hours >12){
                period = "PM";
              }else{
                period ="AM";
              }            
       
       this.setState({
           todaysDate:  dayInTheMonth+"/"+month+"/"+year+" at "+hrs+":"+mins+" "+period
       });
    }
    submitHandler = (event)=>{ 
        event.preventDefault();  //prevents the form from updating the page by default when submitting it
        this.setState({
            loading: true  //shows loading animation
        })
        this.props.onFinishingPurchasing();
        const allInfo ={
            userInfo: this.state.orderForm,
            ingredients: this.state.ingredients,
            extras: {Soda: this.state.soda.selectedPrice !== "0" ? this.state.soda.type : null, Fries: this.state.fries.selectedPrice !== "0" ? "Yes" : "No"},
            price: this.state.price,
            date: this.state.todaysDate
            // in production ready app, you must calculate the price
            
             //on the server because the user might manipulate this code and change price before sending it
                  
        } 

       let isDataReadyToSubmit;
       
       for(let key in this.state.orderForm){                      //none of the "isValid" values should be false
          let areAllInputsValid = this.state.orderForm[key].isValid !== false;
           if(areAllInputsValid) { //all input must be true to send data
                isDataReadyToSubmit = true;
                this.setState({
                    isAnyInputInvalid: false,
                    inputErrorMSGS: null
                })
                

           }else{
               isDataReadyToSubmit=  false;
               var inputErrorList= []
               inputErrorList.push(this.state.orderForm[key].inputErrorMsg);
               this.setState({
                   isAnyInputInvalid: true,
                   inputErrorMSGS: inputErrorList
               })
               
           }
           
       }
       if(isDataReadyToSubmit){
            axios.post("https://mahmoudvue.firebaseio.com/orders.json", allInfo)
                        .then(response=>{
                            this.props.onNotification("You ordered successfully! Thanks and have a good one.", "success");  //shows an alert indicating a successful process
                                //sends results to the server
                                this.setState({
                                    isOrderCompleted: true,
                                    errorFound: false,
                                    errorMsg: '',
                                    loading: false
                                })
                            
                            }).catch(error=>{
                                    this.setState({
                                        errorFound: true,
                                            errorMsg: error, //forwards the error to the UI
                                            loading: false
                                        })
                                
                            })
       }
       
       
        
        // this.props.history.replace("/"); 
        
        
        // Object.keys(this.state.orderForm).map(inputItem=>{
        //     var isSubmitable = this.state.orderForm[inputItem];
        //         console.log(isSubmitable);
        // })

        
      
    }
    
    
    render(){
        
        return(
            <Auxiliary >
            <div className="checkoutContainer">
                <h1>We hope it will taste well!</h1>
                <div>
                                                          {/* triggers continueOrder function*/}    {/* triggers cancelOrder function*/}
                    <CheckoutSummary ingredients={this.state.ingredients} successBtn={this.continueOrder} cancelBtn={this.cancelOrder} continueBtnInnerText={this.state.continueBtnText}/>
                                                {/* A great way to pass props using Route is to use "render" instead of "component" and return the component with its props like this.. */}
                    <Route path={this.props.match.path + "/makeOrder"} exact  render={()=> (<FormPage  inputHandler={this.inputHandler} submitHandler={this.submitHandler} errorMSG={this.state.errorMsg} errorFOUND= {this.state.errorFound} isItLoading={this.state.loading} isThereInputErrorFound={this.state.isAnyInputInvalid} inputErrorMsg={this.state.inputErrorMSGS}/>)}/>
                    

                   {this.state.isOrderCompleted ?  <Redirect to="/" /> :null}
                </div>
            </div>
            </Auxiliary>
        )
    } 
    
}
const mapStateToProps = state=>{
    return{
        ings: state.ingredients,
        price: state.totalPrice,
        soda: state.sodaBottle,
        fries: state.fries
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onFinishingPurchasing: ()=> dispatch({type: actionTypes.FINISH_PURCHASING}),
        onNotification: (MSG,mood)=> dispatch ({type: actionTypes.SHOW_NOTIFICATION, notificationMessage: MSG, notiMood:mood})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);