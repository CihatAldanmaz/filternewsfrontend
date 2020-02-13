import React, { Component } from "react";
import CategoryList from "./Menu.js";
import { Row, Col } from "reactstrap";
import NewsContainer from "./NewsContainer";
import SearchBar from "./SearchBar";
import LogOut from "./LogOut";
import FilterBarr from "./FilterBarr.js";
import axios from "axios";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import * as newsActions from "../redux/actions/newsActions";

import { connect } from "react-redux";
import "../css/style.css";

class Dashboard extends Component {
  state = {
    liked: [],
    favorite_id: "",
    loading: true
  };

  slugify = str => {
    str = str.replace(/^\s+|\s+$/g, "");

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    // Remove invalid chars
    str = str
      .replace(/[^a-z0-9 -]/g, " ")
      // Collapse whitespace and replace by -
      .replace(/\s+/g, "-")
      // Collapse dashes
      .replace(/-+/g, "-");

    return str;
  };

  getLastCha = word => {
    if (word.slice(-1) === "-") {
      return word.slice(0, -1);
    } else {
      return word;
    }
  };

  likeToNews = (e, info) => {
    let likes = this.state.liked.map(like => like.title);

    const { loggedInUserId } = this.props;
    let new_url = this.slugify(info.url);
    let last_url = this.getLastCha(new_url);
    const { token } = this.props;

    if (likes.includes(info.title)) {
      fetch(`https://filter-newss.herokuapp.com/favorites/${last_url}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
          Authorization: token
        }
      }).then(
        this.setState({
          liked: this.state.liked.filter(like => like.title !== info.title)
        })
      );
    } else {
      axios({
        method: "post",
        url: "https://filter-newss.herokuapp.com/favorites",
        data: {
          title: info.title,
          description: info.description,
          img_url: info.urlToImage,
          news_url: info.url,
          date: info.publishedAt,
          user_id: loggedInUserId,
          istrue: true
        }
      }).then(
        this.setState({
          liked: [...this.state.liked, info]
        }),
        alertify.success("You Liked " + info.title)
      );
    }
  };

  allFav = () => {
    const { token } = this.props;

    const { loggedInUserId } = this.props;

    if (loggedInUserId) {
      fetch(`https://filter-newss.herokuapp.com/users/${loggedInUserId}`, {
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(user =>
          this.setState({
            liked: user.favorites
          })
        );
    }
  };

  componentDidMount() {
    this.allFav();
  }

  render() {
    console.log(this.state.liked);
    return (
      <div>
        <Row>
          <Col xs="2">
            <CategoryList />
          </Col>
          <Col xs="9" className="maincol">
            <LogOut />
            <SearchBar />

            <Row>
              <Col xs="2"></Col>
              <Col>
                <FilterBarr />
              </Col>
            </Row>

            <NewsContainer
              likeToNews={this.likeToNews}
              favs={this.state.liked}
            />
          </Col>
        </Row>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
