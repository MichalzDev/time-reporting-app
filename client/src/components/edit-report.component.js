import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "moment/locale/pl";

const OptionProject = (props) => <option>{props.project.project_name}</option>;
const OptionUser = (props) => <option>{props.user.user_name}</option>;

class EditReport extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.onChangeReportWho = this.onChangeReportWho.bind(this);
    this.onChangeReportProject = this.onChangeReportProject.bind(this);
    this.onChangeReportFrom = this.onChangeReportFrom.bind(this);
    this.onChangeReportStatus = this.onChangeReportStatus.bind(this);
    this.onChangeReportHours = this.onChangeReportHours.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      report_who: "",
      report_project: "",
      report_from: "",
      report_hours: "",
      report_status: "",
      data_who: [],
      data_project: [],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    axios
      .get("http://localhost:5000/reports/" + this.props.reportId)
      .then((res) => {
        this.setState({
          report_who: res.data.report_who,
          report_project: res.data.report_project,
          report_from: res.data.report_from,
          report_hours: res.data.report_hours,
          report_status: res.data.report_status,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
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

    const obj = {
      report_who: this.state.report_who,
      report_project: this.state.report_project,
      report_from: this.state.report_from,
      report_hours: this.state.report_hours,
      report_status: this.state.report_status,
    };

    axios.post(
      "http://localhost:5000/reports/edit/" + this.props.reportId,
      obj
    );

    this.props.history.push("/reports");

    this.setState({
      report_who: "",
      report_project: "",
      report_from: "",
      report_hours: "",
      report_status: "",
      data_who: [],
      data_project: [],
    });
  }
  userList() {
    return this.state.data_who.map((el) => {
      return <OptionUser user={el} key={el._id} value={el.name}></OptionUser>;
    });
  }
  projectList() {
    return this.state.data_project.map((el) => {
      return (
        <OptionProject
          project={el}
          key={el._id}
          value={el.name}
        ></OptionProject>
      );
    });
  }

  render() {
    return (
      <Container>
        <div style={{ marginTop: 20 }}>
          <h3>Edytuj Raport</h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Label>Kto: </Form.Label>
            <Form.Control
              as="select"
              value={this.state.report_who}
              onChange={this.onChangeReportWho}
            >
              {this.props.permission === "user" ? (
                <option>{this.props.name}</option>
              ) : (
                this.userList()
              )}
            </Form.Control>
            <Form.Label>Projekt: </Form.Label>
            <Form.Control
              as="select"
              value={this.state.report_project}
              onChange={this.onChangeReportProject}
            >
              {this.projectList()}
            </Form.Control>
            <Form.Label>Status: </Form.Label>
            <Form.Control
              as="select"
              value={this.state.report_status}
              onChange={this.onChangeReportStatus}
            >
              <option value="not_verified">Nie zweryfikowano</option>
              <option value="accepted">Zaakceptowano</option>
              <option value="rejected">Odrzucono</option>
            </Form.Control>
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Label>Miesiąc: </Form.Label>
                  <br></br>
                  <Form.Control
                    as="select"
                    value={this.state.report_from}
                    onChange={this.onChangeReportFrom}
                  >
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
                  {/* <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="L"
                  value={`${formatDate(this.state.report_from, "L", "pl")}`}
                  dayPickerProps={{
                    locale: "pl",
                    localeUtils: MomentLocaleUtils,
                  }}
                  onChange={this.onChangeReportFrom}
                /> */}
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
                    Edytuj
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

export default EditReport;
