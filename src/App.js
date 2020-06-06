import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import SignIn from "./SignIn";
import BodyBackgroundColor from "react-body-backgroundcolor";
import "./css/style.css";

export default class App extends Component {
  state = {
    loggedInUserId: localStorage.userId,
    token: localStorage.token,
  };

  componentDidMount() {
    this.setState({
      token: localStorage.token,
    });
  }

  isLoggedIn() {
    return !!this.state.token;
    // return !!this.state.loggedInUserId
  }

  logInUser = (token, userId) => {
    localStorage.token = token;
    localStorage.userId = userId;
    this.setState({
      token: token,
      loggedInUserId: userId,
    });
  };

  logOutUser = () => {
    delete localStorage.token;
    delete localStorage.userId;
    this.setState({
      token: null,
      loggedInUserId: null,
    });
  };

  render() {
    return (
      <main>
        {this.isLoggedIn() ? (
          <>
            <Dashboard
              token={this.state.token}
              loggedInUserId={this.state.loggedInUserId}
              logOutUser={this.logOutUser}
            />
          </>
        ) : (
          <BodyBackgroundColor backgroundColor="#3F51B5">
            <SignIn logInUser={this.logInUser} />
          </BodyBackgroundColor>
        )}
      </main>
    );
  }
}
