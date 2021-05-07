import React ,{useState} from "react";
import "./Auth.css";

const Auth =(props)=>{
    const [mainAuthFormInfo,  setAuthFormInfo] = useState({
        authInfo : {
            email: {value: "" , isValid : false, type: "email"},
            password: {value: "" , isValid : false , type: "password"},
        }
    })
    const handleSubmitEvent=()=>{
        console.log("works");
    }
    
   const handleInputEvents = (event, elType)=>{
        const updatedForm = { //copies all elements in authInfo in the state
            ...mainAuthFormInfo.authInfo
        }
        const updatedElement = {  //selects an element according to "elType" parameter
            ...updatedForm[elType]
        }
       updatedElement.value = event.target.value;  //changes value to that element
       updatedForm[elType] = updatedElement;  //equalize the form with the updated property values

       setAuthFormInfo(updatedForm);    //equalize the main state info object with the updated data
    //    if(elType === "email"){
    //        authInfo.email.push(event.target.value.trim()+ authInfo.email);
    //    }else{
    //        authInfo.email = authInfo.email
    //    }
    //     if(elType === "password"){
    //         authInfo.password.push(event.target.value.trim() + authInfo.password);
    //    }else{
    //         authInfo.password = authInfo.password;
    //    }
        const enteredEmail = mainAuthFormInfo.email;
        const enteredPassword = mainAuthFormInfo.password;
        // firebase.auth().signInWithEmailAndPassword(enteredEmail, enteredPassword).then(cred=>{
        //     console.log(cred);
        // })
        
    }
    return(
        <div className="AuthContainer">
            <h1>Form</h1>
            <div className="AuthCard">
                <form onSubmit={handleSubmitEvent}>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input id="email" onChange={(event)=> handleInputEvents(event, "email")} type="email" className="form-control"/>
                    <label htmlFor="password"><strong>Password</strong></label> 
                    <input id="password" type="password" className="form-control" onChange={(event)=> handleInputEvents(event,"password")}/>

                    <input type="submit" value="Log In" className="btn btn-success mt-4"/>               
                </form>
            </div>
            
        </div>
    )
}

export default Auth;