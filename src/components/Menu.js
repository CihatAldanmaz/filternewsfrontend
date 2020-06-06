import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as newsActions from "../redux/actions/newsActions";
import { connect } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRss,
  faFlask,
  faBriefcase,
  faFootballBall,
  faTabletAlt,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";

const Nav = styled.nav`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  position: "fixed";
  border-top: 25px solid #3f51b5;

  .logo {
    height: 54px;
    width: 100%;
    background: #3f51b5;
  }

  .logo-main {
    height: 100%;
    width: 100%;
    background: #3f51b5;
  }

  .logo-main a {
    padding-top: 15px;
    display: flex;
    font-size: 20px;
    color: #fafafa;
    padding-left: 16px;
  }

  .menu {
    padding-top: 10px;
  }

  .menu ul li a {
    color: rgba(0, 0, 0, 0.54);
    cursor: pointer;
    padding: 8px 16px 8px 16px;
    position: relative;
    box-sizing: border-box;
    align-items: center;
    height: 48px;
    line-height: 24px;
    text-align: flex-end;
    align-items: center;
    display: flex;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    line-height: 1.5;
    font-size: 30px;
    letter-spacing: 0.00938em;
  }

  .menu ul li a:hover .fontawe {
    color: #3f51b5;
  }
  .menu ul li a:hover h5 {
    color: #3f51b5;
  }

  .menu ul li a h5 {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    margin-left: 35px;
    font-weight: 400;
  }

  .menu ul li {
    width: 100%;
    margin-top: 25px;
  }
  .menu ul li a:hover {
    background: #e6e6e6;
    width: 100%;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    width: 50px;
    .menu ul li a h5 {
      display: none;
    }
  }
`;

class Menu extends Component {
  render() {
    return (
      <Nav>
        <nav>
          <div className="menu">
            <ul>
              <li>
                <a onClick={() => this.props.actions.getNews()}>
                  <FontAwesomeIcon icon={faRss} className="fontawe" />

                  <h5>Latest News</h5>
                </a>
              </li>
              <li>
                <a onClick={() => this.props.actions.getNews(`science`)}>
                  <FontAwesomeIcon icon={faFlask} className="fontawe" />

                  <h5>Science</h5>
                </a>
              </li>
              <li>
                <a onClick={() => this.props.actions.getNews(`business`)}>
                  <FontAwesomeIcon icon={faBriefcase} className="fontawe" />
                  <h5>Business</h5>
                </a>
              </li>
              <li>
                <a onClick={() => this.props.actions.getNews(`sports`)}>
                  <FontAwesomeIcon icon={faFootballBall} className="fontawe" />

                  <h5>Sports</h5>
                </a>
              </li>
              <li>
                <a onClick={() => this.props.actions.getNews(`technology`)}>
                  <FontAwesomeIcon icon={faTabletAlt} className="fontawe" />

                  <h5>Tech</h5>
                </a>
              </li>
              <li>
                <a onClick={() => this.props.actions.getNews(`health`)}>
                  <FontAwesomeIcon icon={faHeartbeat} className="fontawe" />

                  <h5>Health</h5>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Nav>
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
