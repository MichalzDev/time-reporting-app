import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import axios from "axios";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const OptionProject = (props) => <option>{props.report.project_name}</option>;
const OptionUser = (props) => <option>{props.user.user_name}</option>;
class CreateReport extends Component {
  constructor(props) {
    super(props);
    this.onChangeReportWho = this.onChangeReportWho.bind(this);
    this.onChangeReportProject = this.onChangeReportProject.bind(this);
    this.onChangeReportFrom = this.onChangeReportFrom.bind(this);
    this.onChangeReportTo = this.onChangeReportTo.bind(this);
    this.onChangeReportHours = this.onChangeReportHours.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      report_who: "",
      report_project: "",
      report_from: "",
      report_to: "",
      report_hours: "",
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
  onChangeReportTo(e) {
    this.setState({
      report_to: e.toLocaleDateString(),
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
    console.log(`Report To: ${this.state.report_to}`);
    console.log(`Report Hours: ${this.state.report_hours}`);

    const newReport = {
      report_who: this.state.report_who,
      report_project: this.state.report_project,
      report_from: this.state.report_from,
      report_to: this.state.report_to,
      report_hours: this.state.report_hours,
    };

    axios
      .post("http://localhost:5000/reports/create", newReport)
      .then((res) => console.log(res.data));

    this.props.history.push("/reports");

    this.setState({
      report_who: "",
      report_project: "",
      report_from: "",
      report_to: "",
      report_hours: "",
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
            as="select"
            value={this.state.report_project}
            onChange={this.onChangeReportProject}
          >
            {this.projectList()}
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
                <Form.Label>To: </Form.Label>
                <DayPickerInput
                  value={this.state.report_to}
                  onDayChange={this.onChangeReportTo}
                ></DayPickerInput>
              </Col>
            </Form.Row>
            <Form.Label>Hours: </Form.Label>
            <Form.Control
              type="number"
              value={this.state.report_hours}
              onChange={this.onChangeReportHours}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Col>
                <Button variant="primary" type="submit">
                  Create Report
                </Button>
              </Col>
              <Col>
                <Button variant="danger" href="/reports">
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

export default CreateReport;
