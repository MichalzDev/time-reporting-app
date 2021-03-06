import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "react-day-picker/lib/style.css";
import "moment/locale/pl";

const OptionProject = (props) => <option>{props.report.project_name}</option>;
const OptionUser = (props) => <option>{props.user.user_name}</option>;

class CreateReport extends Component {
  constructor(props) {
    super(props);
    this.onChangeReportWho = this.onChangeReportWho.bind(this);
    this.onChangeReportProject = this.onChangeReportProject.bind(this);
    this.onChangeReportFrom = this.onChangeReportFrom.bind(this);
    this.onChangeReportHours = this.onChangeReportHours.bind(this);
    this.onChangeReportStatus = this.onChangeReportStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      report_who:
        this.props.user.permission === "user" ? this.props.user.name : "",
      report_project: "",
      report_from: "",
      report_hours: "",
      report_status: "not_verified",
      data_who: [],
      data_project: [],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    axios
      .get("http://localhost:5000/projects/")
      .then((res) => {
        this.setState({ data_project: res.data });
      })
      .catch(function (err) {
        console.log(err);
      });
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        this.setState({ data_who: res.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  onChangeReportWho(e) {
    this.setState({
      report_who: e.target.value,
    });
  }
  onChangeReportProject(e) {
    this.setState({
      report_project: e.target.value,
    });
  }
  onChangeReportFrom(e) {
    this.setState({
      report_from: e.target.value,
    });
  }
  onChangeReportStatus(e) {
    this.setState({
      report_status: e.target.value,
    });
  }
  onChangeReportHours(e) {
    this.setState({
      report_hours: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newReport = {
      report_who: this.state.report_who,
      report_project: this.state.report_project,
      report_from: this.state.report_from,
      report_hours: this.state.report_hours,
      report_status: this.state.report_status,
    };

    axios.post("http://localhost:5000/reports/create", newReport);

    this.props.history.push("/reports");

    this.setState({
      report_who:
        this.props.user.permission === "user" ? this.props.user.name : "",
      report_project: "",
      report_from: "",
      report_hours: "",
      report_status: "",
      data_who: [],
      data_project: [],
    });
  }

  projectList() {
    return this.state.data_project.map((el) => {
      return (
        <OptionProject report={el} key={el._id} value={el.name}></OptionProject>
      );
    });
  }
  userList() {
    return this.state.data_who.map((el) => {
      return <OptionUser user={el} key={el._id} value={el.name}></OptionUser>;
    });
  }
  render() {
    return (
      <Container>
        <div style={{ marginTop: 20 }}>
          <h3>Nowy Raport</h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Label>Kto: </Form.Label>
            <Form.Control
              as="select"
              value={this.state.report_who}
              onChange={this.onChangeReportWho}
            >
              {this.props.user.permission === "user" ? (
                <option>{this.props.user.name}</option>
              ) : (
                this.userList()
              )}
            </Form.Control>
            <Form.Label>Projekt: </Form.Label>
            <Form.Control as="select" onChange={this.onChangeReportProject}>
              <option value="none" selected disabled>
                Wybierz Projekt
              </option>
              {this.projectList()}
            </Form.Control>
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Label>Miesiąc: </Form.Label>
                  <br></br>
                  <Form.Control as="select" onChange={this.onChangeReportFrom}>
                    <option value="none" selected disabled>
                      Wybierz Miesiąc
                    </option>
                    <option value="Styczeń">Styczeń</option>
                    <option value="Luty">Luty</option>
                    <option value="Marzec">Marzec</option>
                    <option value="Kwiecień">Kwiecień</option>
                    <option value="Maj">Maj</option>
                    <option value="Czerwiec">Czerwiec</option>
                    <option value="Lipiec">Lipiec</option>
                    <option value="Sierpień">Sierpień</option>
                    <option value="Wrzesień">Wrzesień</option>
                    <option value="Październik">Październik</option>
                    <option value="Listopad">Listopad</option>
                    <option value="Grudzień">Grudzień</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Ilość Godzin: </Form.Label>
                  <Form.Control
                    type="number"
                    value={this.state.report_hours}
                    onChange={this.onChangeReportHours}
                    min="1"
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
                    onClick={() => window.location.reload()}
                  >
                    Anuluj
                  </Button>
                </Col>
              </Form.Row>
            </Form.Group>
          </Form>
        </div>
      </Container>
    );
  }
}

export default CreateReport;
