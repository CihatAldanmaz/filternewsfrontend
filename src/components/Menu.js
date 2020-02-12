import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as newsActions from "../redux/actions/newsActions";
import { connect } from "react-redux";
import "../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRss,
  faFlask,
  faBriefcase,
  faFootballBall,
  faTabletAlt,
  faHeartbeat
} from "@fortawesome/free-solid-svg-icons";

class Menu extends Component {
  render() {
    return (
      <div className="sidebar" style={{ position: "fixed" }}>
        <div className="logo">
          <div className="logo-main">
            <a>
              <FontAwesomeIcon icon={faRss} />
              <h5>News</h5>
            </a>
          </div>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <a onClick={() => this.props.actions.getNews()}>
                <FontAwesomeIcon icon={faRss} />

                <h5>Latest News</h5>
              </a>
            </li>
            <li>
              <a onClick={() => this.props.actions.getNews(`science`)}>
                <FontAwesomeIcon icon={faFlask} />

                <h5>Science</h5>
              </a>
            </li>
            <li>
              <a onClick={() => this.props.actions.getNews(`business`)}>
                <FontAwesomeIcon icon={faBriefcase} />
                <h5>Business</h5>
              </a>
            </li>
            <li>
              <a onClick={() => this.props.actions.getNews(`sports`)}>
                <FontAwesomeIcon icon={faFootballBall} />

                <h5>Sports</h5>
              </a>
            </li>
            <li>
              <a onClick={() => this.props.actions.getNews(`technology`)}>
                <FontAwesomeIcon icon={faTabletAlt} />

                <h5>Tech</h5>
              </a>
            </li>
            <li>
              <a onClick={() => this.props.actions.getNews(`health`)}>
                <FontAwesomeIcon icon={faHeartbeat} />

                <h5>Health</h5>
              </a>
            </li>
          </ul>
        </nav>
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
      getNews: bindActionCreators(newsActions.getNews, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
