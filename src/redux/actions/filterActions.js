import * as actionTypes from "./actionTypes"


export function filterNews(source){
    return {
        type:actionTypes.FILTER_NEWS_SUCCESS,
        payload:source
    }
}





