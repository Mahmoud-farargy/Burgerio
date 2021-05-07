import React, {PureComponent} from "react";
import "../../Layout/Layout.css";
import Buttons from "./actionBtns";
import Extras from "./Extras/Extras";
            //here we use PureComponent because this component might be
            //re-rendered unnecessarily. For example,
            //when the modal is hidden it updates the prices which is
            //not necessary.
class  OrderBtn extends PureComponent{
    // shouldComponentUpdate(nextProp, nextState){
    //     return nextProp.modalState ? true : false;
    // }
    componentDidUpdate= ()=>{ //keeps track of component updates
        // console.log("Component Updated! ");
    }
    render(){
        // console.log(this.props.showModal, this.props.modalState);
        
        let handleOrderBtn;

        if(this.props.purchasable){
            handleOrderBtn ="orderBtnStyle"
        }else{
            handleOrderBtn = "orderBtnStyle disabledOrderBtn"
        }
        var shouldModalOpen;
        if(this.props.modalState && this.props.purchasable){
            shouldModalOpen = true;
        }else{
            shouldModalOpen = false;
        }
        return(
            <div>
            <button className={handleOrderBtn}  onClick={this.props.showModal}>Order Now!</button>
                <div className="myModal" style={{
                    transform: shouldModalOpen ? "translateY(0)" : "translateY(-100vh)",
                    opacity: shouldModalOpen ? "1" : "0",
                    // display: shouldModalOpen ? "block" : "none"
                }}>
                <div className="modalBody">
                    {this.props.loading === false ?
                    <div>
                        <div>
                        
                                <h3>Your Order</h3>
                            
                            <h5 style={{margin:"8px 0", fontSize:"19px", fontWeight:"400"}}>A delicious burger with the following ingredients:</h5>
                            <ul> 
                                {/* //this code also works but I want to hard code it */}
                                {Object.keys(this.props.ingredients).map((igKey, index)=>{
                                    return (
                                        // if   value           greater than 0,  then show this value and   it's property if not then show nohing.
                                    <div key={igKey+index}>{this.props.ingredients[igKey] > 0 ? <li >  {this.props.ingredients[igKey]} {this.props.ingredients[igKey] >1 ? "pieces": "piece"} of {igKey}. </li> : null}</div>
                                    )
                                })
                                }
                                

                            </ul>
                            <Extras />

                            <strong>Total Price: ${this.props.TPrice.toFixed(2)}</strong>
                            
                        </div>
                        <div className="modalFooter">
                            <p>Continue to checkout?</p>
                            <div>
                                <Buttons onClick={this.props.closeModal} BTNClass="cancelBtn" >Cancel</Buttons>
                                <Buttons onClick={this.props.ordered} BTNClass="continueBtn">Continue </Buttons>
                            </div>
                        </div>
                    </div>
                    :
                    <div id="loading"></div>
                    }
                    </div>
                </div>
        </div>
            
        
    )
        
    }
    
        
}

export default OrderBtn;