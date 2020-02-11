import * as actionTypes from "./../../actions/actionTypes"
import initialState from "./initialState";

export default function denemeReducer(state=initialState.deneme,action){
    switch (action.type) {
        case actionTypes.GET_DENEME_SUCCESS:
            return action.payload
            
        default:
            return state;
    }
}

