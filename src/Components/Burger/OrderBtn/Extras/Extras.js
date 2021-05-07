import React ,{Fragment} from "react";
import {connect} from "react-redux";
const Extras = (props) =>{
    return(
        <Fragment>
            {props.soda.selectedPrice !== 0 || props.fries.selectedPrice !== 0  ? <h5 style={{margin:"8px 0", fontSize:"19px", fontWeight:"400"}}>Extras</h5> : null}
            {props.soda.selectedPrice !== 0 ? <p style={{margin:"0"}}> Soda Bottle: {props.soda.type}</p> : null} 
            {props.fries.selectedPrice !== 0 ? <p style={{margin:"0 0 8px 0"}}>Fries: ${props.fries.selectedPrice}</p> :null}
        </Fragment>
    )
}
const mapStateToProps = state=>{
    return{
        soda: state.sodaBottle,
        fries: state.fries
    }
}

export default connect(mapStateToProps)(Extras);