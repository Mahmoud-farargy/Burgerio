import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "../Burger/Burger.css";
const Burger  = (props)=>{          //accesses the object properties that we receive from "bugerBuilder" component
    let transformedIngredients = Object.keys(props.ingredients) //maps through those properties
        .map(igKey =>{                                  //maps through the values of those properties
            return [...Array(props.ingredients[igKey])].map((_, index)=>{ //the components get repeated accordingly with the appropriate type
                return <BurgerIngredient key={igKey + index} type={igKey} />
            });
        })
        .reduce((accumulator, currentArr)=>{
            return accumulator.concat(currentArr); //joins the old ingredient(s) with the new one and not causing them to be switched
        },[])
        if(transformedIngredients.length === 0){
            transformedIngredients = "Please start adding ingredients!";
        }
    // console.log(props.ingredients);

    
    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
export default Burger;