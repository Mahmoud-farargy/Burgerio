import React, {Component} from "react";
import "../BurgerIngredient/BurgerIngredientStyle.css";
// import PropsTypes from 'prop-types';

class BurgerIngredient extends Component{
    render(){
        let ingredient= null; //null by default
            switch (this.props.type){
                case ("bread-bottom"):
                    ingredient = <div className="BreadBottom"></div>;
                break;
                case ("bread-top"):
                    ingredient =(
                        <div className="BreadTop">
                            <div className="Seeds1"></div>
                            <div className="Seeds2"></div>
                        </div>
                    ); 
                break;
                case ("meat"):
                    ingredient = <div className="Meat"></div>
                break;
                case ("cheese"):
                    ingredient = <div className="Cheese"></div>
                break;
                case ("salad"):
                    ingredient = <div className="Salad"></div>
                break;
                case ("bacon"):
                    ingredient = <div className="Bacon"></div>
                break;
                case ("tomatoes"):
                    ingredient = <div className="Tomatoes"></div>
                break;

                default: //emphasizes to keep ingredient null by default
                    ingredient =null;
                break;
        }
        return ingredient;
  
    };
    
}
            //Install propTypes and uncomment this
// BurgerIngredient.propTypes={
//             type: PropTypes.string.isRequired
// }
       
export default BurgerIngredient;