import React from "react";
import "./Order.css";

const Order = (props)=>{
    const ingredientsVar= [];
             for( let ingredientName in props.ingredients){
                 ingredientsVar.push({
                     name: ingredientName,
                     amount: props.ingredients[ingredientName]
                 })
             };
    let ingredientOutput = ingredientsVar.map((item, index)=>{
        
        return (<span key={index} className="ig">{item.name} ({item.amount})</span>)
    });
    
    return(
       
            <li className={props.styleClass}>
             <p>Ingredients: {ingredientOutput}.</p>
             <p>Soda: {props.extras.Soda}.</p>
             <p>Fries: {props.extras.Fries}.</p>
             <p>Price: <strong>${props.price}</strong>.</p>
             
             <small className="text-dark" style={{display:"block"}}>Order was made in: {props.date}.</small>
            </li>
    )
}
export default Order;