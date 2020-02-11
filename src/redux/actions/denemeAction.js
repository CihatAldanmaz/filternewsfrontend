import * as actionTypes from "./actionTypes"

export function getDenemeSuccess(news, isdone){
    return {
        type:actionTypes.GET_DENEME_SUCCESS,
        payload:{news:news,isdone:isdone}
    }
}

export function getDeneme(categoryName){
    return function(dispatch){
        let url = `https://newsapi.org/v2/top-headlines?sources=the-new-york-times,cnn,the-wall-street-journal,abc-news,fox-news,cbs-news,the-washington-post,&apiKey=72eb57002bca4d42a85404eef1e97d2a&pageSize=100`;
        if(categoryName){
            url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoryName}&apiKey=72eb57002bca4d42a85404eef1e97d2a&pageSize=100`
        }
        
        return fetch(url)
        .then(resp => resp.json())
        .then(result => 
            dispatch(getDenemeSuccess(result.articles,`done`))
            )
    }
}






