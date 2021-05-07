import * as actionTypes from "./actionTypes";

const INGREDIENT_PRICES ={ //price for each ingredient
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon:0.7,
  tomatoes: 0.5
}
const SODA_PRICES={
  "Coca Cola $1.1": 1.1,
  "Pepsi $1.3": 1.3,
  "Dr Pepper $0.80": 0.80,
  "Diet Coke $0.90": 0.90,
  "Mountain Dew $1.2": 1.2,
  "Sprite $0.95": 0.95,
  "Fanta $0.70": 0.70,
  "None": 0
}

const initialState = { //initial state (GLOBAL STATE)
      ingredients:{
        salad: 0,
        tomatoes: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 1,
    sodaBottle: {type: "None", selectedPrice: 0 , touched: false},
    fries: {val:"No", selectedPrice: 0, touched: false},
    isPurchasingComplete: false,
    notification:{
      notify: false,
      mood: "",
      popUpMsg: ""
    }
    
  }                   //set "initialize" object as a "store" default state
  
  const rootReducer= (state = initialState, action)=>{
    switch(action.type){
      case actionTypes.ADD_INGREDIENT : //adds new ingredients
        const priceAddition = INGREDIENT_PRICES[action.ingredientName];
        const oldPrice = state.totalPrice; //updates price
        const newPrice = oldPrice + priceAddition;
        return {
          ...state,
            ingredients:{
              ...state.ingredients,   //updates amounts
              [action.ingredientName]: state.ingredients[action.ingredientName] +1
            },
            totalPrice: newPrice
      };
        break;
      case actionTypes.REMOVE_INGREDIENT: //removes ingredients
        if(state.ingredients[action.ingredientName] >0){ //updates price
          const priceSubtraction = INGREDIENT_PRICES[action.ingredientName];
          const oldPrice = state.totalPrice;
          const newPrice = oldPrice - priceSubtraction;
            return {
            ...state,
                  ingredients:{
                      ...state.ingredients, //updates amounts
                      [action.ingredientName]: state.ingredients[action.ingredientName] -1
                  },
              totalPrice: newPrice
            }
        }
          break;
        case actionTypes.FINISH_PURCHASING: //when the purchasing process is over
           return{
             ...state,//keeps old data as the are
                ingredients:{  //resets all ingredients to zero
                  salad: 0,
                  tomatoes: 0,
                  meat: 0,  
                  bacon: 0,
                  cheese: 0
              },
              sodaBottle: {type: "None", selectedPrice: 0 , touched: false},
              fries: {val:"No", selectedPrice: 0, touched: false},
              totalPrice: 1,
              isPurchasingComplete: true
           }
           break;
        case actionTypes.SHOW_NOTIFICATION:
           return{
             ...state,
             notification:{
               ...state.notification,
                notify: true,
                mood: action.notiMood,
                popUpMsg: action.notificationMessage
             }
             
           }
        case actionTypes.CLOSE_NOTIFICATION:
          return{
            ...state,
            notification: {
              notify: false,
              notificationMessage: "",
              mood: ""
            }
           
          }
          break;
        case actionTypes.UPDATE_SODA_CHOICE:
          return{
            ...state,
            totalPrice: !state.sodaBottle.touched ? state.totalPrice + SODA_PRICES[action.payload] : SODA_PRICES[action.payload] - state.sodaBottle.selectedPrice + state.totalPrice,
            sodaBottle:{type: action.payload, selectedPrice: SODA_PRICES[action.payload] , touched: true}
            
          }
        case actionTypes.UPDATE_Fries_CHOICE:
          const oldprice = state.totalPrice;
          const friesPrice = 1.60;
          if(action.payload === "Yes $1.60"){
              return{
              ...state,
              fries: {val: action.payload, selectedPrice: friesPrice, touched: true},
              totalPrice: !state.fries.touched ? oldprice + friesPrice : state.fries.selectedPrice
            }
          }
          break;
        case actionTypes.NONE_SELECTED:
         if(action.payload === "Soda"){
           return{
             ...state,
             totalPrice: state.totalPrice - state.sodaBottle.selectedPrice,
             sodaBottle: {type: state.sodaBottle.type , selectedPrice: 0, touched: false},
           }
         }
         if(action.payload === "Fries"){
           return{
             ...state,
             totalPrice: state.totalPrice - state.fries.selectedPrice,
             fries: {...state.fries, selectedPrice:0 , touched: false}
           }
         }
         break;
      default:
        return state;
        break;
    }
    
  };
  
  

  
export default rootReducer;