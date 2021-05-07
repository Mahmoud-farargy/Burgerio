import React from "react";
import "../../../Layout/Layout.css";
const BurgerControl = (props)=>{
    const isDecreasable =  props.ingredients[props.type] > 0 ;
    const isIncreasable =  props.ingredients[props.type] < 10 
    return(
       
        <div>
            <div className="ingredientStyle">
                <strong className="ingredientName">{props.label} </strong>
                <span className="ingredientControl">
                    <button className={`ingredientBtns Less ${ !isDecreasable && "disabledLessBtn"}`} disabled={!isDecreasable} onClick={props.removeFunc}>Less</button>
                    <button className={`ingredientBtns ${!isIncreasable && "disabledLessBtn"}`} disabled={!isIncreasable} onClick={props.addFunc}>More</button>
                    <p>Piece:{props.ingredients[props.type]}</p>
                 
                </span>
            </div>

        </div>
    )
}

export default BurgerControl;