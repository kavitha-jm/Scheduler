import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <image className="profile"></image>
          <image className="streak"></image>
          <br/><br/><br/><br/><br/>
          <h3>
            <strong>Hello {currentUser.username}</strong> 
          </h3>
          <br/><br/>
        <p>
          <strong>Email:<span class="glyphicon glyphicon-envelope"></span> </strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        <strong className="streakcnt">Streaks : 1</strong>
        </header>
      </div>: null}
      </div>
    
    );
  }
}
