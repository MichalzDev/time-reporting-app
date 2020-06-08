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
import Button from "react-bootstrap/Button";

import CreateUser from "./create-user.component";
import ReadUser from "./read-user.component";
import EditUser from "./edit-user.component";

import CreateProject from "./create-project.component";
import ReadProject from "./read-project.component";
import EditProject from "./edit-project.component";
import CreateReport from "./create-report.component";
import ReadReport from "./read-report.component";
import EditReport from "./edit-report.component";
import Raport from "./raport";

class User extends Component {
  state = {
    reports: [],
  };

  componentDidMount() {
    fetch("http://localhost:5000/reports/user/" + this.props.user.name)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          reports: res,
        })
      );
  }

  render() {
    return (
      <Router>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>Control panel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Button
                variant="secondary"
                className="m-2"
                onClick={() => this.props.redirect("/reports/user/" + this.props.user.name)}
              >
                Moje raporty
              </Button>
              <Button
                variant="secondary"
                className="m-2"
                onClick={() => this.props.redirect("/reports/create/:name")}
              >
                Utwórz raport
              </Button>
              <Button
                type="button"
                onClick={() => {
                  fetch("http://localhost:5000/users/logout", {
                    method: "PUT",
                  });
                  this.props.redirect(null);
                }}
              >
                WYLOGUJ
              </Button>
            </Navbar.Collapse>
          </Navbar>
          {/* <Route path="/users/" exact component={ReadUser} />
          <Route path="/users/create" exact component={CreateUser} />
          <Route path="/users/edit/:id" exact component={EditUser} />
          <Route path="/projects" exact component={ReadProject} />
          <Route path="/projects/create" exact component={CreateProject} />
          <Route path="/projects/edit/:id" exact component={EditProject} />
          <Route path="/reports" exact component={ReadReport} />
          <Route path="/reports/create" exact component={CreateReport} />
          <Route path="/reports/edit/:id" exact component={EditReport} /> */}
          <h3 style={{textAlign: 'center'}} className="mt-3 mb-3">Raporty {this.props.user.name}</h3>
          <Raport reports={this.state.reports} />
        </Container>
      </Router>
    );
  }
}
export default User;
