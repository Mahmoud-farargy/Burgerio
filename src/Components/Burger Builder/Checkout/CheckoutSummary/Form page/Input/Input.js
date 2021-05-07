import React from "react";
import "./Input.css";
const Input = (props)=>{
    let inputElement; //initialize variable
    switch (props.inputtype){ //create switch cases to handle different conditions
        case "input":      //{...props} selects all the attributes that are passed in as props from "Form" component
            inputElement = <input {...props}/>
            break;
        case "textarea":
            inputElement = <textarea {...props}/>
            break;
        case "select":
            inputElement = (<select {...props} >
                    <option>Fastest</option>
                    <option>Cheapest</option>
            </select>)
            break;
        default: 
            inputElement = <input {...props}/>
            break;
    }   
    return(
        <div className="myInput">
            <label className="label">{props.label}</label>
             {inputElement} {/* renders the "inputElement" variable */}
        </div>
    )
}

export default Input;