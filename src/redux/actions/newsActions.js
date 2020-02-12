import * as actionTypes from "./actionTypes"

export function getNewsSuccess(news){
    
    return {
        type:actionTypes.GET_NEWS_SUCCESS,
        payload:news
        
    }
}



export function getNews(categoryName){
    return function(dispatch){
        let url = `https://newsapi.org/v2/top-headlines?sources=the-new-york-times,cnn,the-wall-street-journal,abc-news,fox-news,cbs-news,the-washington-post,&apiKey=!!apkey!!&pageSize=100`;
        if(categoryName){
            url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoryName}&apiKey=!!apkey!!&pageSize=100`
        }
        
        return fetch(url)
        .then(resp => resp.json())
        .then(result => 
            dispatch(getNewsSuccess(result.articles))
            )
    }
}

export function filterNews(source){
    return function(dispatch){
        let url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=!!apkey!!&pageSize=100`
        return fetch(url)
        .then(resp => resp.json())
        .then(result => dispatch(getNewsSuccess(result.articles)))
    }
}

export function searchNews(word){
    return function(dispatch){
       let url = `https://newsapi.org/v2/top-headlines?country=us&q=${word}&apiKey=!!apikey!!`
    

    return fetch(url)
        .then(resp => resp.json())
        .then(result => dispatch(getNewsSuccess(result.articles)))
    }
}


