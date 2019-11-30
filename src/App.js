import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import Dashboard from "./components/Dashboard"
import LogIn from './LogIn'
import SignInSide from './SignInSide'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Navi from "./components/Navi";




export default class App extends Component {


  state = {
    loggedInUserId: localStorage.userId,
    token: localStorage.token
  }

  componentDidMount(){
    this.setState({
      token: localStorage.token
    })
  }

  isLoggedIn(){
    return !!this.state.token
    // return !!this.state.loggedInUserId
  }
  
  logInUser = (token, userId) => {
    localStorage.token = token
    localStorage.userId = userId
    this.setState({
      token: token,
      loggedInUserId: userId
    })
  }

  logOutUser = () => {
    delete localStorage.token
    delete localStorage.userId
    this.setState({
      token: null,
      loggedInUserId: null
    })
  }

  checkNavi = (e) => {
    console.log(e)
  }
  
  render() {
    return (<main>
      {
        this.isLoggedIn() 
        ? <>
          <Navi checkNavi = {this.logOutUser}/>
          <Dashboard token={ this.state.token } loggedInUserId={ this.state.loggedInUserId } />
          </> 
        : <SignIn logInUser={ this.logInUser } />
      }
    </main>);


    // return (
    //   <Router>
    //     <Routes />
    //     </Router>
    // )
  }
}



