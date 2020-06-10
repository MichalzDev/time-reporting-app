import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
import EditReport from "./edit-report.component";
import Raport from "./raport";

class Admin extends Component {
  state = {
    reports: [],
  };

  fetchReports = () => {
    fetch("http://localhost:5000/reports/")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          reports: res,
        })
      );
  };

  componentDidMount() {
    this.fetchReports();
  }

  render() {
    return (
      <Router>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>Panel Nawigacyjny</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavDropdown title="Użytkownicy" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/users">Lista Użytkowników</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/users/create">Stwórz Użytkownika</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Projekty" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/projects">Lista Projektów</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/projects/create">Stwórz Projekt</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Raporty" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/reports">Lista Raportów</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/report/create">Stwórz Raport</Link>
                </NavDropdown.Item>
              </NavDropdown>
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
          <Route path="/users/" exact component={ReadUser} />
          <Route path="/users/create" exact component={CreateUser} />
          <Route path="/users/edit/:id" exact component={EditUser} />
          <Route path="/projects" exact component={ReadProject} />
          <Route path="/projects/create" exact component={CreateProject} />
          <Route path="/projects/edit/:id" exact component={EditProject} />
          <Route
            path="/reports"
            render={(props) => (
              <Raport
                {...props}
                redirect={this.props.redirect}
                reports={this.state.reports}
              />
            )}
          />
          <Route path="/report/create" exact component={CreateReport} />
          <Route path="/reports/edit/:id" exact component={EditReport} />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h5>
              <Link to="/users"> Lista Użytkowników </Link> |
              <Link to="/users/create"> Dodaj Użytkownika </Link> |
              <Link to="/projects"> Lista Projektów </Link> |
              <Link to="/projects/create"> Dodaj Projekt </Link> |
              <Link to="/reports/"> Lista Raportów </Link> |
              <Link to="/report/create/"> Dodaj Raport </Link>
            </h5>
          </div>
        </Container>
      </Router>
    );
  }
}

export default Admin;
