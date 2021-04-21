import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { elastic as Menu } from 'react-burger-menu'
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import TextEditor from "./components/TextEditor.component";
import  WeekTemplate from  "./components/weektemplate.component";
import MonthTemplate from "./components/monthlytemplate.component";
import AddTutorial from "./components/add-schedule.component";
import Tutorial from "./components/schedule.component";
import TutorialsList from "./components/schedules-list.component";
import Calendar from "react-calendar";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      menuOpen: false
    };
  }
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  showSettings (event) {
    event.preventDefault();
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
      
      <div >
        <nav className="navbar navbar-expand navformat ">
          <image className="logo" onClick={() => this.toggleMenu()}>
          <div id="outer-container">
          <Menu isOpen={this.state.menuOpen} 
          onStateChange={(state) => this.handleStateChange(state)}
          pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } disableAutoFocus >
              
                <a onClick={() => this.closeMenu()} href = "/search" className="menu-item linkcolor">Quick Find</a>
                <a onClick={() => this.closeMenu()} href="/add" classname="menu-item linkcolor">Simple Template</a>   
                <a onClick={() => this.closeMenu()} href="/notes" className="menu-item linkcolor">Notes Template</a>
                <a onClick={() => this.closeMenu()} href="/week" className="menu-item linkcolor">Week Scheduler</a>
                <a onClick={() => this.closeMenu()} href="/month" className="menu-item linkcolor">Monthly Scheduler</a>
                      
          </Menu>
          </div>
          </image>
          &emsp;&emsp;&emsp;
          <Link to={"/home"} className="navbar-brand linkcolor title">
            Smart Schedule
            </Link>
            
              
          
               {currentUser ? ( 
              
                
               <div className="navbar-nav ml-auto">
              <li className="nav-item">            
              
                <Link to={"/profile"} className="nav-item linkcolor">
                  {currentUser.username}
                </Link>
                &emsp;
                </li>

              <li className="nav-item ">
                <a href="/login"onClick={this.logOut} className="nav-item linkcolor">
                  LogOut
                </a>
              </li>
              </div>
            
            
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link linkcolor">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link linkcolor">
                  Sign Up
                </Link>
              </li>
              
            </div>
          )}
        </nav>
        
        <div className = "container mt-3">
          <Switch>
            <Route exact path={["/","/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/notes" component={TextEditor}/>
            <Route path="/week" component={WeekTemplate}/>
            <Route path="/month" component={MonthTemplate}/>
            <Route exact path ="/search" component={TutorialsList}/>
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/search/:id" component={Tutorial} />
          </Switch>
        </div>
      </div>
    );
  }
}





export default App;
