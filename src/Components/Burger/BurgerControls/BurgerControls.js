import React from "react";
import {connect} from "react-redux";
import * as actionTypes from "../../../Store/actionTypes";
import BurgerCtrl from "./BurgerControl/BurgerControl";

const BurgerControls = (props)=>{
    // console.log(props)
    const controls = [
        {label: "Salad", type: "salad" },
        {label: "Tomatoes", type: "tomatoes"},
        {label: "Bacon", type: "bacon" },
        {label: "Cheese", type: "cheese" },
        {label: "Meat", type: "meat" },
       
    ]
    const soda=(event)=>{
        props.onSodaChange(event.target.value);
        if(event.target.value === "None"){
            props.onNoneSelection("Soda");
        }
    }
    const fries=(event)=>{
        props.onFriesChange(event.target.value);
        if(event.target.value === "No"){
            props.onNoneSelection("Fries");
        }
    }
    return(
        <div>
            {
                controls.map((ctrl)=>{
                    return <BurgerCtrl //burgerControl component
                    key={ctrl.label}
                    label={ctrl.label}
                    type={ctrl.type}
                    ingredients={props.ingredients}
                    addFunc={()=> props.addFunc(ctrl.type)}
                    removeFunc={()=> props.removeFunc(ctrl.type)} />
                })
            }
            <label htmlFor="soda" className="ingredientName extraIngs">Soda Bottle</label>
            <select id="soda" defaultValue="None" onChange={(event)=> soda(event)}>
                <option>Coca Cola $1.1</option>
                <option>Pepsi $1.3</option>
                <option>Dr Pepper $0.80</option>
                <option>Diet Coke $0.90</option>
                <option>Mountain Dew $1.2</option>
                <option>Sprite $0.95</option>
                <option>Fanta $0.70</option>
                <option>None</option>
            </select>
            <br/>
            <label htmlFor="fries" className="ingredientName extraIngs">French Fries</label>
            <select defaultValue="No" id="fries" onChange={(event)=> fries(event)}>
                <option>Yes $1.60</option>
                <option>No</option>
            </select>
        </div>
    )
}
const mapDispatchToProps = dispatch=>{
    return{
        onSodaChange: (selectedOption)=> dispatch({type:actionTypes.UPDATE_SODA_CHOICE , payload: selectedOption}),
        onFriesChange: (selectedOption)=> dispatch({type: actionTypes.UPDATE_Fries_CHOICE, payload: selectedOption}),
        onNoneSelection: (selectedType)=> dispatch({type: actionTypes.NONE_SELECTED, payload: selectedType})
    }
}
export default connect(null, mapDispatchToProps)(BurgerControls);