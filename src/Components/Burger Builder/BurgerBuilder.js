import React , {Component} from "react";
// import Aux from "../hoc/Aux";
// import Layout from "../Layout/Layout";
import Burger from "../Burger/Burger";
import "../Layout/Layout.css";
import BurgerControls from  "../Burger/BurgerControls/BurgerControls";
import OrderBtn from "../Burger/OrderBtn/OrderBtn";
import Backdrop from "../Burger/OrderBtn/Backdrop/Backdrop";
import {connect} from "react-redux";
import {Redirect,withRouter} from "react-router-dom";
import * as actionTypes from "../../Store/actionTypes";
// import Checkout from "./Checkout/Checkout";
// const redux = require("redux");

class BurgerBuilder extends Component{ //put app state here INGREDIENT-PRICES
    constructor(props){
        super(props);
        this.state={
            totalPrice: 1,
            purchasable: false,
            showModal: false,
            loading: false,
            hasContinueBtnClicked : false,
        }
    }               
    
    //passes updated ingredients through the parameter
    
    updatePurchaseState=(ingrs)=>{ //makes "purchasable" be true or false according to values in the ingredients state
                                //if all values are 0 then purcharable will be false therefore the order button will be disabled and vise versa
        // const ingr = {
        //     ...this.props.ings
        // };
       var sum = Object.keys(this.props.ings)
       .map((igKey)=>{ //loop through properties
            return this.props.ings[igKey]
        })
        .reduce((accumulator, currentEl)=>{ //we use reduce to get access to the old values "accumulator" and add them to the current values
            return accumulator + currentEl;
        },0)
        return sum > 0 //if sum is greater than 0, purchasable will turn to true and vise versa
        
    }

    purchaseHandler =()=>{  //allow" showModal" to be only true when
                            //the "purchasable" state is also true
        // console.log(this.state);
        //--ONE WAY--

    //    var isItPurchasable =this.updatePurchaseState() ; //this function returns true if the sum of all ingredients is higher than 0
    //    if(isItPurchasable){                              //otherwise it returns false
    //        this.setState({
    //         showModal: true
    //     });
    //    }else{
    //        this.setState({
    //             showModal: false
    //        });
          
    //    }

       //--BETTER WAY--
       this.setState({ //when the "updatePurchaseState()" function returns true, "showModal "also turns true and vice versa.
           showModal: this.updatePurchaseState(),
           purchasable: this.updatePurchaseState()
       })
        
    }
    closeModal = ()=>{
        this.setState({       //when user click cancel in the modal
            showModal: false
        });
    }
    handleCompletedOrder=()=>{ //when user click continue in the modal
        //just for reference
        // this.setState({
        //     hasContinueBtnClicked: true
        // });

        //---USING QUERY PARAMES----
        if(this.state.purchasable){
        //     const queryParams = [];
        //     for (let i in this.props.ings){
        //      //push ingredient properties to queryParams      //push ingredients values to queryParams
        //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        //     }
        //     const queryString = queryParams.join('&'); //add "&" between each character
        //-------------------------

            this.props.history.push({
                pathname: "/checkout",
                // search: '?' + queryString
            }); //alternative way to redirect the user to another page
        }
    

        if(this.props.finishPurchasing){
            this.setState({
                    showModal:false,  //should be removed from here
                    purchasable: false,
                    loading: true,        
            })
        }
       
    }

    render(){

        return(
            <div> {/*uncomment setState in handleCompletedOrder function to activate this "Redirect"
                component. I used this.props.history.push('/makeOrder') alternatively.*/}
                {this.state.hasContinueBtnClicked ? <Redirect to="/makeOrder" /> : null}
                <Burger ingredients={this.props.ings}/>
                <div className="Container">
                    <p style={{textAlign:"center", marginTop:"15px"}}>Current Price:<strong> ${this.props.price.toFixed(2)}</strong></p>

                    <BurgerControls ingredients={this.props.ings} addFunc={this.props.onAddingAnIngredient} removeFunc={this.props.onRemovingAnIngredient} isLessBtnDisabled={this.state.disableLessBtns}/>
                    
                    <Backdrop show={this.state.showModal} clicked={this.closeModal}/> {/* Modal's layout*/}
                    <OrderBtn ingredients= {this.props.ings} TPrice={this.props.price} purchasable={this.updatePurchaseState()}  showModal={this.purchaseHandler} closeModal={this.closeModal} modalState={this.state.showModal} ordered={this.handleCompletedOrder} loading={this.state.loading} extractinput={this.inputHandler} subHandler={this.submitHandler}/>
                    {/* <Form  extractinput={this.inputHandler} subHandler={this.submitHandler}/>  will be moved from here  */}
                </div>
                {/* <Route path="/test" exact render={()=> <Layout />}/> */}
                {/* <Checkout ingredients={this.props.ings} successBtn={this.handleCompletedOrder} cancelBtn={this.closeModal}/> */}
            </div>
        )
    }
        
}

const mapStateToProps= state =>{
    return {
        ings : state.ingredients,
        price: state.totalPrice,
        finishPurchasing: state.isPurchasingComplete
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAddingAnIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT , ingredientName: ingName}),
        onRemovingAnIngredient: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerBuilder));