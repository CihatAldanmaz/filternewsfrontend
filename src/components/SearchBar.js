import React, { Component } from 'react'
import SearchBari from 'material-ui-search-bar'


import { bindActionCreators } from "redux";
import * as newsActions from "../redux/actions/newsActions";
import { connect } from "react-redux";



class SearchBar extends Component {

  state = {
    word:''
  }

  searchSetState = (e) => {
    
this.setState({
  word:e
},this.searchSubmit)
  }

  searchSubmit = () => {
    this.props.actions.searchNews(this.state.word)
  }
  
    render() {
        return(
            <SearchBari
              onChange={(e) => this.searchSetState(e)}
              onRequestSearch={(e) => this.searchSubmit(e)}
              value = ""
              style={{
                margin: '0 auto',
                marginTop : 30,
                marginBottom: 30,
                maxWidth: 800
                
              }}
            />
          )
        }
    }


    function mapStateToProps(state) {
      return {
        news: state.newsListReducer
      };
    }
    
    function mapDispatchToProps(dispatch) {
      return {
        actions: {
          getNews: bindActionCreators(newsActions.getNews, dispatch),
          filterNews: bindActionCreators(newsActions.filterNews, dispatch),
          searchNews: bindActionCreators(newsActions.searchNews, dispatch)
        }
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
    