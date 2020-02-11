import {combineReducers} from "redux"
import newsListReducer from "./newsListReducer"
import filterNewsReducer from "./filterNewsReducer"
import denemeReducer from "./denemeReducers"





const rootReducer = combineReducers({
    newsListReducer,
    filterNewsReducer,
    denemeReducer
})

export default rootReducer;