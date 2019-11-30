import React, { Component } from "react";
import NewsCard from "./NewsCard";
import Grid from "@material-ui/core/Grid";

export default class NewsContainer extends Component {
    favsMapping = () => {
        
        return this.props.favs.map(fav => {
            return fav.title
        });
    };
    
    render() {
    return (
      <div>
        <Grid container spacing={80} style={{ padding: 24 }} >
          {this.props.displayNews.map(news => (
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
