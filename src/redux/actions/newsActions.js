import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getNewsSuccess(news) {
  return {
    type: actionTypes.GET_NEWS_SUCCESS,
    payload: news,
  };
}

export function getNews(categoryName) {
  return function (dispatch) {
    let url =
      "http://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=bba14026000541b28e8df5c2f9bc6bef";
    if (categoryName) {
      url = `http://newsapi.org/v2/top-headlines?country=us&category=${categoryName}&apiKey=6b4e6f967bdd48cba46e703456bd838a&pageSize=100`;
    }

    return axios
      .get(url)
      .then((result) => dispatch(getNewsSuccess(result.data.articles)));
  };
}

export function filterNews(source) {
  return function (dispatch) {
    let url = `http://newsapi.org/v2/top-headlines?sources=${source}&apiKey=bba14026000541b28e8df5c2f9bc6bef&pageSize=100`;
    return fetch(url)
      .then((resp) => resp.json())
      .then((result) => dispatch(getNewsSuccess(result.articles)));
  };
}

export function searchNews(word) {
  return function (dispatch) {
    let url = `http://newsapi.org/v2/top-headlines?country=us&q=${word}&apiKey=bba14026000541b28e8df5c2f9bc6bef`;

    return fetch(url)
      .then((resp) => resp.json())
      .then((result) => dispatch(getNewsSuccess(result.articles)));
  };
}
