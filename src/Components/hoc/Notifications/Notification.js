import React from "react";
import "./Notification.css";
import {connect} from "react-redux";
import * as actionTypes from "../../../Store/actionTypes";
class Notification extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            notification: true
        }
    }
    render(){
        
        if(this.state.notification){
            let notificationTimeout = setTimeout(()=>{ //makes the message disappear automatically after 4.7 seconds
                this.setState({
                    notification:false
                })
                this.props.onClosingNotifiaction(); //closes notification entirely
                clearTimeout(notificationTimeout);
            },4700);
            
            return (//component will render if "notification.nofity" in the global state in reduce file is true
                    <div className={`alert alert-${this.props.mood} notification text-center py-2`}>
                            <strong>{this.props.popUpMessage}</strong>
                    </div>
                );
        }else{
            return null; //component won't render
        }
    }
    
}

const mapStateToProps = state=>{
    return{
        notify: state.notification.notify, //returns boolean
        popUpMessage: state.notification.popUpMsg,
        mood: state.notification.mood
    }
}
const mapDispatchToProps= dispatch=>{
    return{
        onClosingNotifiaction: ()=> dispatch({type: actionTypes.CLOSE_NOTIFICATION}) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);