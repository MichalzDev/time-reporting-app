import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/signin";
import CreateProject from "./components/create-project.component";
import ReadProject from "./components/read-project.component";
import EditProject from "./components/edit-project.component";
import CreateReport from "./components/create-report.component";
import EditReport from "./components/edit-report.component";
import Admin from "./components/admin";
import User from "./components/user";
import Supervisor from "./components/supervisor";

class App extends Component {
  state = {
    login: "",
    password: "",
    permission: "",
    name: "",
    redirect: null,
    id: "",
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
            name: res.user_name,
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
          name: res.user_name,
        })
      );
  };

  redirect = (link, id) => {
    this.setState({
      redirect: link,
      id: id,
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Router>
          <Redirect to={this.state.redirect} />
          <Route
            path="/admin"
            render={(props) => <Admin {...props} redirect={this.redirect} />}
          />
          <Route
            path="/user"
            render={(props) => (
              <User {...props} redirect={this.redirect} user={this.state} />
            )}
          />
          <Route
            path={"/reports/create/" + this.state.name}
            render={(props) => <CreateReport {...props} user={this.state} />}
          />

          <Route
            path={"/reports/edit/" + this.state.id}
            render={(props) => (
              <EditReport
                {...props}
                name={this.state.name}
                reportId={this.state.id}
              />
            )}
          />
          <Route
            path="/supervisor"
            render={(props) => (
              <Supervisor
                {...props}
                redirect={this.redirect}
                user={this.state}
              />
            )}
          />
          <Route path="/projects" exact component={ReadProject} />
          <Route path="/projects/create" exact component={CreateProject} />
          <Route path="/projects/edit/:id" exact component={EditProject} />
        </Router>
      );
    }
    return (
      <Router>
        <Container>
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
