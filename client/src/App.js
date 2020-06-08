import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import SignIn from "./components/signin";
import CreateUser from "./components/create-user.component";
import ReadUser from "./components/read-user.component";
import EditUser from "./components/edit-user.component";

import CreateProject from "./components/create-project.component";
import ReadProject from "./components/read-project.component";
import EditProject from "./components/edit-project.component";
import CreateReport from "./components/create-report.component";
import ReadReport from "./components/read-report.component";
import EditReport from "./components/edit-report.component";
import Admin from "./components/admin";
import User from './components/user';

class App extends Component {
  state = {
    login: "",
    password: "",
    permission: "",
    name: "",
    redirect: null,
  };

  componentDidMount() {
    fetch("http://localhost:5000/users/isLoggedIn")
      .then((res) => res.json())
      .then((res) => {
        if (res !== null) {
          this.setState({
            login: res.user_login,
            password: res.user_password,
            permission: res.user_permissions,
            redirect: "/" + res.user_permissions,
            name: res.user_name
          });
        }
      });
  }

  onChangeLogin = (e) => {
    this.setState({
      login: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = () => {
    fetch(
      "http://localhost:5000/users/" +
        this.state.login +
        "/" +
        this.state.password,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          permission: res.user_permissions,
          redirect: "/" + res.user_permissions,
          name: res.user_name
        })
      );
  };

  redirect = (link) => {
    this.setState({
      redirect: link
    })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Router>
          <Redirect to={this.state.redirect} />
          <Route
            path="/admin"
            render={(props) => (
              <Admin
                {...props}
                redirect={this.redirect}
              />
            )}
          />
                    <Route
            path="/user"
            render={(props) => (
              <User
                {...props}
                redirect={this.redirect}
                user={this.state}
              />
            )}
          />
          <Route path="/reports/create/:name" exact component={CreateReport} />
        </Router>
      );
    }
    return (
      <Router>
        <Container>
          {/* <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" >Control panel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to='/users'>Users List</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/users/create'>Create User</Link></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Projects" id="basic-nav-dropdown">
                <NavDropdown.Item ><Link to='/projects'>Projects List</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/projects/create'>Create Project</Link></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Reports" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to='/reports'>Reports List</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/reports/create'>Create Report</Link></NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Navbar> */}
          <Route
            path="/"
            render={(props) => (
              <SignIn
                {...props}
                onChangeLogin={this.onChangeLogin}
                onChangePassword={this.onChangePassword}
                onSubmit={this.onSubmit}
              />
            )}
          />
        </Container>
      </Router>
    );
  }
}
export default App;
