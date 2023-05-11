import {createStore,applyMiddleware,combineReducers} from "redux";
import countReducer from "./count_reducer.js"
//引入redux-thunk,用于支持异步action
import thunk from "redux-thunk"
import personReducer from "./person_reducer.js";
import {composeWithDevTools} from "redux-devtools-extension"
//汇中所有的reducers
const allReducer=combineReducers({
    sum:countReducer,
    persons:personReducer
})
const store=createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)));
export default store;