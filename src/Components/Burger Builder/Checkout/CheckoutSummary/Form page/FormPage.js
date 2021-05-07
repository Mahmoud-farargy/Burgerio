import React, {Component} from "react";
import Auxiliary from "../../../../hoc/Auxiliary";
import "./FormPage.css";
import Form from "./Form/Form";
import "../../../../Layout/Layout.css";
class FormPage extends Component{
    
    render(){  //conditional form rendering

        let form =( //by default, it shows the form
                <Form  extractinput={this.props.inputHandler} orderedSuccessfully={this.props.submitHandler}/>
            );       //when loading, it shows animation
            if(this.props.isItLoading){
                form = (<div id="loading"></div>);
            }       //if the user is offline, it informs them
            if(navigator.onLine ===false){
                form =(<div className="alert alert-danger text-center"><div>You are offline now. please reconnect and try again!</div></div>);
                    //if any error found, it prints it to the UI
            }else if(this.props.errorFOUND){
                form = (<div className="alert alert-danger text-center"><div>{this.props.errorMSG}</div></div>);
            }  
        return(
            <Auxiliary>
                <div className="MyContainer">
                    <h3>Application</h3>
                    <h5>Please fill out the contact form below</h5>
                    <div className="Form-card">

                        {form}   {/*renders form dynamically as it switches between "form" component and the spinner animation*/}
                         
                    </div>
                   
                </div>
            </Auxiliary>
        )
    }
}

export default FormPage;