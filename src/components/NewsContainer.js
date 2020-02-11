import React, { Component } from "react";
import NewsCard from "./NewsCard";
import Grid from "@material-ui/core/Grid";
import ReactLoading from "react-loading";
import { bindActionCreators } from "redux";
import * as newsActions from "../redux/actions/newsActions";
import * as denemeActions from "../redux/actions/denemeAction";
import { Button } from 'reactstrap';


import { connect } from "react-redux";


class NewsContainer extends Component {

  state = {
    deneme:[]
  }

  componentDidMount() {
    
    this.props.actions.getNews()
    this.props.actions.deneme()
    this.setState({deneme:this.props.deneme})
    
    
  }

  setiayarlar = () => {
    this.setState({deneme:this.props.deneme})
  }



helperfunc = () => {
  console.log(this.props)
}
    

favsMapping = () => {
      
 return this.props.favs.map(fav => {
       
         return fav.title
         
       
   });
};

clickDeneme = () => {
  
  this.setState({deneme:this.props.deneme})
  // console.log(this.props.deneme)
 
  // return this.props.deneme.news.map(deneme => (console.log(deneme)))
  // console.log("deneme:",this.props.deneme.news, "news:", this.props.news)
  
  // this.props.deneme.isdone.map(deneme => {console.log(deneme)})
}
render() {
  let newsi = this.props.news;
  return (
    <div>
          <Button onClick = {this.clickDeneme} color="primary">primary</Button>{' '}

        
        <Grid container spacing={80} style={{ padding: 24 }} >
          
          {newsi.map(news => (
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <NewsCard
                news={news}
                likeToNews={this.props.likeToNews}
                favs={this.favsMapping()}
              />
            </Grid>
          ))}
        </Grid>

      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    news: state.newsListReducer,
    deneme: state.denemeReducer
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getNews: bindActionCreators(newsActions.getNews, dispatch),
      deneme:bindActionCreators(denemeActions.getDeneme, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);

