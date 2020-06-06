import React, { Component } from "react";
import NewsCard from "./NewsCard";
import Grid from "@material-ui/core/Grid";
import { bindActionCreators } from "redux";
import * as newsActions from "../redux/actions/newsActions";

import { connect } from "react-redux";

class NewsContainer extends Component {
  componentDidMount() {
    this.props.actions.getNews();
  }

  favsMapping = () => {
    return this.props.favs.map((fav) => {
      return fav.title;
    });
  };

  render() {
    return (
      <div>
        <Grid container spacing={80} style={{ padding: 24 }}>
          {this.props.news.map((news) => (
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
    deneme: state.denemeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getNews: bindActionCreators(newsActions.getNews, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
