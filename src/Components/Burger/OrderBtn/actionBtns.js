import React from "react";
import "../../Layout/Layout.css";
const ActionBtns = (props)=>{
    return (
        <button onClick={props.onClick} className={props.BTNClass}>{props.children}</button>
    )
}

export default ActionBtns;