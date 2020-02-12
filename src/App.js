import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import SignIn from "./SignIn";

export default class App extends Component {
  state = {
    loggedInUserId: localStorage.userId,
    token: localStorage.token
  };

  componentDidMount() {
    this.setState({
      token: localStorage.token
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
      loggedInUserId: userId
    });
  };

  logOutUser = () => {
    delete localStorage.token;
    delete localStorage.userId;
    this.setState({
      token: null,
      loggedInUserId: null
    });
  };

  render() {
    return (
      <main
        style={{
          backgroundColor: "#FAFAFA"
        }}
      >
        {this.isLoggedIn() ? (
          <>
            <Dashboard
              token={this.state.token}
              loggedInUserId={this.state.loggedInUserId}
            />
          </>
        ) : (
          <SignIn logInUser={this.logInUser} />
        )}
      </main>
    );
  }
}
