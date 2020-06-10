import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
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
            <Navbar.Brand>Panel Kontrolny</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Button
                variant="secondary"
                className="m-2"
                onClick={() => window.location.reload()}
              >
                Moje raporty
              </Button>
              <Button
                variant="secondary"
                className="m-2"
                onClick={() =>
                  this.props.redirect("/reports/create/" + this.props.user.name)
                }
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
          <h3 style={{ textAlign: "center" }} className="mt-3 mb-3">
            Raporty {this.props.user.name}
          </h3>
          <Raport reports={this.state.reports} redirect={this.props.redirect} />
        </Container>
      </Router>
    );
  }
}
export default User;
