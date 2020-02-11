import React, { Component } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as newsActions from "../redux/actions/newsActions";


class FfilterBarr extends Component {

  state = {
    sources: ''
  }

  letsfetch = () => {
      if(this.state.sources.length > 0){
    this.props.actions.filterNews(this.state.sources)}
    else{
        this.props.actions.getNews()
    }
  }

    getSources = (source) => {
        if(!this.state.sources.includes(source)){
       this.setState({sources:this.state.sources + source },this.letsfetch)
       
    }else{
        this.setState(
            { sources: this.state.sources.replace(source, "")}, this.letsfetch)
            
    }
}

    render() {
        return (
            <FormGroup row>
    
            <FormControlLabel
              control={
                <Switch  onClick={() => this.getSources(`cnn,`)} value="cnn" />
                
              }
              label="CNN"
              name = "cnn"
            />
            <FormControlLabel
              control={
                <Switch onClick={() => this.getSources(`the-wall-street-journal,`)} value="wsj" />
                
              }
              label="WSJ"
              name = "wsj"
            />
      
          <FormControlLabel
              control={
                <Switch  onClick={() => this.getSources(`abc-news,`)} value="abc" />
                
              }
              label="ABC News"
              name = "abc"
            />
      
      <FormControlLabel
              control={
                <Switch  onClick={() => this.getSources(`fox-news,`)} value="fox" />
                
              }
              label="Fox News"
              name = "fox"
            />
      
      <FormControlLabel
              control={
                <Switch  onClick={() => this.getSources(`cbs-news,`)} value="cbs" />
                
              }
              label="CBS News"
              name = "cbs"
            />
      
      <FormControlLabel
              control={
                <Switch  onClick={() => this.getSources(`the-washington-post,`)} value="twp" />
                
              }
              label="The Washington Post"
              name = "twp"
            />
      
          </FormGroup>
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
        filterNews: bindActionCreators(newsActions.filterNews, dispatch)
      }
    };
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FfilterBarr);