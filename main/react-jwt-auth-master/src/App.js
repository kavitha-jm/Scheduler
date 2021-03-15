import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import TextEditor from "./components/TextEditor.component";

import AddTutorial from "./components/add-schedule.component";
import Tutorial from "./components/schedule.component";
import TutorialsList from "./components/schedules-list.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand ">
          <Link to={"/Scheduler"} className="navbar-brand">
            ScheDule
          </Link>

         

            <div className="navbar-nav mr-auto">
				    
              <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
              
              </li>

              <li className="nav-item">
               <Link to={"/add"} className="nav-link">
                 Add
               </Link>
               </li>
               </div>
               {currentUser ? ( 
              <div className="navbar-nav ml-auto">
              <li className="nav-item">            
              
                <Link to={"/profile"}>
                  {currentUser.username}
                </Link>
                &emsp;
                </li>

              <li className="nav-item">
                <a href="/login"onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
            
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
              
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/Scheduler" component={TextEditor}/>
            <Route exact path ="/home" component={TutorialsList}/>
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/home/:id" component={Tutorial} />
          </Switch>
        </div>
      </div>
    );
  }
}





export default App;
