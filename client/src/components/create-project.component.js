import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import axios from "axios";

class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeProjectMembers = this.onChangeProjectMembers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      project_name: "",
      project_members: [],
    };
  }

  onChangeProjectName(e) {
    this.setState({
      project_name: e.target.value,
    });
  }

  onChangeProjectMembers(e) {
    this.setState({
      project_members: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    console.log(`Project Name: ${this.state.project_name}`);
    console.log(`Project Members: ${this.state.project_members}`);

    const newProject = {
      project_name: this.state.project_name,
      project_members: this.state.project_members,
    };

    axios
      .post("http://localhost:5000/projects/create", newProject)
      .then((res) => console.log(res.data));

    this.props.history.push("/projects");

    this.setState({
      project_name: "",
      project_members: [],
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Stwórz Nowy Projekt</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Label>Nazwa: </Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.project_name}
                  onChange={this.onChangeProjectName}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label>Opis: </Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.project_members}
                  onChange={this.onChangeProjectMembers}
                ></Form.Control>
              </Col>
            </Form.Row>
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
                  onClick={() => this.props.history.push("/projects")}
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

export default CreateProject;
