import  React, {Component} from "react"; //this component is under    
import Input from "../Input/Input";       //constuction
import "../Input/Input.css";
class Form extends Component{
    
    // componentDidMount(){
    //     console.log(this.props);
    // }
    render(){
        return(   //triggers "submitHandler" function in "BurgerBuilder" component when the submit button is pressed
            <form onSubmit={(event)=>this.props.subHandler(event)}> {/* passes in "event" and "category" to "extractinput" function in "BurgerBuilder" component */}
                <Input onChange={(event) => this.props.extractinput(event, "firstName")} inputtype="input" type="text" placeholder= "Your First Name" />
                <Input onChange={(event) => this.props.extractinput(event, "lastName")} inputtype="input" type="text" placeholder= "Your Last Name" />
                <Input onChange={(event) => this.props.extractinput(event, "email")} inputtype="input" type="email" placeholder= "Email" />
                <Input onChange={(event) => this.props.extractinput(event,"address")} inputtype="input" type="text" placeholder= "Address" />
                <Input onChange={(event) => this.props.extractinput(event, "postal")} inputtype="input" type="number" placeholder= "Postal Code" />
                <Input onChange={(event) => this.props.extractinput(event, "phoneNum")} inputtype="input" type="number" placeholder= "Phone Number" />
                <Input onChange={(event) => this.props.extractinput(event,"shipMethod")} inputtype="select"/>
                <br />
                <div className="SubmitBtnContainer">
                    <input className="btn btn-success" type="submit" value="Send Order" onClick={this.props.orderedSuccessfully} />
                </div>
                
            </form>
        )
    }
}
export default Form;