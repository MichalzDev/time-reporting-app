import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const Report = (props) => (
  <tr>
    <td>{props.report.report_who}</td>
    <td>{props.report.report_project}</td>
    <td>{props.report.report_from}</td>
    <td>{props.report.report_hours}</td>
    <td>{props.report.report_status}</td>
    <td>
      <Link to={"/reports/edit/" + props.report._id}>Edit </Link>
      <a
        href="/reports"
        onClick={() => {
          props.deleteReport(props.report._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

class ReadReport extends Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    this.deleteReport = this.deleteReport.bind(this);
    this.state = {
      reports: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get("http://localhost:5000/reports/")
      .then((res) => {
        this.setState({ reports: res.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  // componentDidCatch() {
  //     axios.get('http://localhost:5000/reports/')
  //     .then(res => {
  //         this.setState({reports: res.data})
  //     })
  //     .catch(function(err){
  //         console.log(err);
  //     })
  // }
  componentDidUpdate() {
    axios
      .get("http://localhost:5000/reports/")
      .then((res) => {
        this.setState({ reports: res.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  deleteReport(id) {
    axios.delete("http://localhost:5000/reports/delete/" + id).then((res) => {
      console.log(res.data);
    });
    this.setState({
      reports: this.state.reports.filter((el) => el._id !== id),
    });
  }

  reportList() {
    return this.state.reports.map((el) => {
      return (
        <Report
          report={el}
          deleteReport={this.deleteReport}
          key={el._id}
        ></Report>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Reports List</h3>
        <Table striped bordered hover style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Who</th>
              <th>Project</th>
              <th>From</th>
              <th>Hours</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.reportList()}</tbody>
        </Table>
      </div>
    );
  }
}

export default ReadReport;
