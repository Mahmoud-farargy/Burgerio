import React from "react";
import Burger from "../../../Burger/Burger";
import Buttons from "../../../Burger/OrderBtn/actionBtns";
const CheckoutSummary = (props)=>{
    return(
        <div>
           <Burger ingredients={props.ingredients} />

                <Buttons onClick={props.cancelBtn} BTNClass="cancelBtn">Cancel</Buttons>
                <Buttons  onClick={props.successBtn} BTNClass="continueBtn">{props.continueBtnInnerText}</Buttons>
        </div>
    )
}

export default CheckoutSummary;