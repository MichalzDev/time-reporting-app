import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import axios from "axios";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
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
      .get("http://localhost:5000/reports/" + this.props.match.params.id)
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
    console.log(this.data_who);
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
      report_from: e.toLocaleDateString(),
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
    console.log("Form submitted");
    console.log(`Report Who: ${this.state.report_who}`);
    console.log(`Report Project: ${this.state.report_project}`);
    console.log(`Report From: ${this.state.report_from}`);
    console.log(`Report Hours: ${this.state.report_hours}`);
    console.log(`Report Status: ${this.state.report_status}`);

    const obj = {
      report_who: this.state.report_who,
      report_project: this.state.report_project,
      report_from: this.state.report_from,
      report_hours: this.state.report_hours,
      report_status: this.state.report_status,
    };

    axios
      .post(
        "http://localhost:5000/reports/edit/" + this.props.match.params.id,
        obj
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/reports");

    this.setState({
      report_who: "",
      report_project: "",
      report_from: "",
      report_hours: "",
      report_status: "",
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
      <div style={{ marginTop: 20 }}>
        <h3>Create New Report</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Label>Who: </Form.Label>
          <Form.Control
            as="select"
            value={this.state.report_who}
            onChange={this.onChangeReportWho}
          >
            {this.userList()}
          </Form.Control>
          <Form.Label>Project: </Form.Label>
          <Form.Control
            type="select"
            value={this.state.report_project}
            onChange={this.onChangeReportProject}
          >
            {/* {this.projectList()} */}
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
                <Form.Label>From: </Form.Label>
                <DayPickerInput
                  value={this.state.report_from}
                  onDayChange={this.onChangeReportFrom}
                ></DayPickerInput>
              </Col>
              <Col>
                <Form.Label>Hours: </Form.Label>
                <Form.Control
                  type="number"
                  value={this.state.report_hours}
                  onChange={this.onChangeReportHours}
                ></Form.Control>
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Col>
                <Button variant="primary" type="submit">
                  Edit Report
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => this.props.history.push("/reports")}
                >
                  Cancel
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default EditReport;
