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
import styled from "styled-components";

const Gmain = styled.div`
  display: grid;
  grid-template-columns: 2fr 9fr;
  grid-template-areas: "sidegrid maingrid";
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 50px 6fr;
    grid-template-areas: "sidegrid maingrid ";
    justify-content: center;
  }
`;

const Sgrid = styled.div`
  grid-area: sidegrid;
`;

const Mgrid = styled.div`
  grid-area: maingrid;
  display: grid;
  background: #fafafa;
  justify-items: center;

  .button {
    background-color: #3e51b5;
    color: white;
    width: 100px;
    height: 40px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-family: roboto;
    cursor: pointer;
    position: fixed;
    right: 25px;
    transition: 0.3s;
  }
`;

const Rgrid = styled.div`
  grid-area: rightgrid;
  background: #fafafa;
`;

class Dashboard extends Component {
  state = {
    liked: [],
    favorite_id: "",
    loading: true,
  };

  slugify = (str) => {
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

  getLastCha = (word) => {
    if (word.slice(-1) === "-") {
      return word.slice(0, -1);
    } else {
      return word;
    }
  };

  likeToNews = (e, info) => {
    let likes = this.state.liked.map((like) => like.title);

    const { loggedInUserId } = this.props;
    let new_url = this.slugify(info.url);
    let last_url = this.getLastCha(new_url);
    const { token } = this.props;

    if (likes.includes(info.title)) {
      fetch(`https://filter-newss.herokuapp.com/favorites/${last_url}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }).then(
        this.setState({
          liked: this.state.liked.filter((like) => like.title !== info.title),
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
          istrue: true,
        },
      }).then(
        this.setState({
          liked: [...this.state.liked, info],
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
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((user) =>
          this.setState({
            liked: user.favorites,
          })
        );
    }
  };

  componentDidMount() {
    this.allFav();
  }

  render() {
    return (
      <Gmain>
        <Sgrid>
          <CategoryList />
        </Sgrid>
        <Mgrid>
          <SearchBar />
          <FilterBarr />

          <NewsContainer likeToNews={this.likeToNews} favs={this.state.liked} />
          <button
            class="button button2"
            onClick={() => this.props.logOutUser()}
          >
            Log Out
          </button>
        </Mgrid>
      </Gmain>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.newsListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getNews: bindActionCreators(newsActions.getNews, dispatch),
      filterNews: bindActionCreators(newsActions.filterNews, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
