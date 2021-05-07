import React from "react";

import '../../../Layout/Layout.css';

const Backdrop = (props)=>{ //(Modal's layout)
    // console.log(props.show)
    return (
        props.show? <div className="backdrop" onClick={props.clicked}></div> : null
    )
    
}

export default Backdrop;