import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import axios from "axios";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserLogin = this.onChangeUserLogin.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserRole = this.onChangeUserRole.bind(this);
    this.onChangeUserPermissions = this.onChangeUserPermissions.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user_login: "",
      user_password: "",
      user_name: "",
      user_role: "",
      user_projects: [],
      user_permissions: "",
    };
  }

  onChangeUserLogin(e) {
    this.setState({
      user_login: e.target.value,
    });
  }

  onChangeUserPassword(e) {
    this.setState({
      user_password: e.target.value,
    });
  }

  onChangeUserName(e) {
    this.setState({
      user_name: e.target.value,
    });
  }

  onChangeUserRole(e) {
    this.setState({
      user_role: e.target.value,
    });
  }

  onChangeUserProjects(e) {
    this.setState({
      user_projects: [...e.target.value],
    });
  }

  onChangeUserPermissions(e) {
    this.setState({
      user_permissions: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      user_login: this.state.user_login,
      user_password: this.state.user_password,
      user_name: this.state.user_name,
      user_role: this.state.user_role,
      user_projects: this.state.user_projects,
      user_permissions: this.state.user_permissions,
    };

    axios.post("http://localhost:5000/users/create", newUser);

    this.props.history.push("/users");

    this.setState({
      user_login: "",
      user_password: "",
      user_name: "",
      user_role: "",
      user_projects: [],
      user_permissions: "",
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Stwórz Nowego Użytkownika</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Imię: </Form.Label>
            <Form.Control
              type="text"
              value={this.state.user_name}
              onChange={this.onChangeUserName}
            ></Form.Control>
            <Form.Row>
              <Col>
                <Form.Label>Login: </Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.user_login}
                  onChange={this.onChangeUserLogin}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label>Hasło: </Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.user_password}
                  onChange={this.onChangeUserPassword}
                ></Form.Control>
              </Col>
            </Form.Row>
            <Form.Label>Rola: </Form.Label>
            <Form.Control
              type="text"
              value={this.state.user_role}
              onChange={this.onChangeUserRole}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              type="radio"
              label="User"
              name="permissions"
              id="permissionUser"
              value="user"
              checked={this.state.user_permissions === "user"}
              onChange={this.onChangeUserPermissions}
            />
            <Form.Check
              inline
              type="radio"
              label="Supervisor"
              name="permissions"
              id="permissionSupervisor"
              value="supervisor"
              checked={this.state.user_permissions === "supervisor"}
              onChange={this.onChangeUserPermissions}
            />
            <Form.Check
              inline
              type="radio"
              label="Admin"
              name="permissions"
              id="permissionAdmin"
              value="admin"
              checked={this.state.user_permissions === "admin"}
              onChange={this.onChangeUserPermissions}
            />
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Col>
                <Button variant="primary" type="submit">
                  Stwórz
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => window.location.reload()}
                >
                  Anuluj
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CreateUser;
