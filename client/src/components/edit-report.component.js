import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class EditReport extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.onChangeReportWho = this.onChangeReportWho.bind(this);
        this.onChangeReportProject = this.onChangeReportProject.bind(this);
        this.onChangeReportFrom = this.onChangeReportFrom.bind(this);
        this.onChangeReportTo = this.onChangeReportTo.bind(this);
        this.onChangeReportHours = this.onChangeReportHours.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            report_who: '',
            report_project: '',
            report_from: '',
            report_to: '',
            report_hours: '',
        }
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:5000/reports/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                report_who: res.data.report_who,
                report_project: res.data.report_project,
                report_from: res.data.report_from,
                report_to: res.data.report_to,
                report_hours:res.data.report_hours,
            })
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    onChangeReportWho(e) {
        this.setState({
            report_who: e.target.value
        });
    }
    onChangeReportProject(e) {
        this.setState({
            report_project: e.target.value
        });
    }
    onChangeReportFrom(e) {
        this.setState({
            report_from: e.toLocaleDateString()
        });
    }
    onChangeReportTo(e) {
        this.setState({
            report_to: e.toLocaleDateString()
        });
    }
    onChangeReportHours(e) {
        this.setState({
            report_hours: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('Form submitted');
        console.log(`Report Who: ${this.state.report_who}`);
        console.log(`Report Project: ${this.state.report_project}`);
        console.log(`Report From: ${this.state.report_from}`);
        console.log(`Report To: ${this.state.report_to}`);
        console.log(`Report Hours: ${this.state.report_hours}`);

        const obj = {
            report_who: this.state.report_who,
            report_project: this.state.report_project,
            report_from: this.state.report_from,
            report_to: this.state.report_to,
            report_hours: this.state.report_hours,
        }

        axios.post('http://localhost:5000/reports/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));

        this.props.history.push('/reports');

        this.setState({
            report_who: '',
            report_project: '',
            report_from:'',
            report_to: '',
            report_hours: '',
        })
    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Create New Report</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Label>Who: </Form.Label>
                    <Form.Control type='text' value={this.state.report_who} onChange={this.onChangeReportWho}></Form.Control>
                    <Form.Label>Project: </Form.Label>
                    <Form.Control type='text' value={this.state.report_project} onChange={this.onChangeReportProject}></Form.Control>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>From: </Form.Label>
                                <DayPickerInput value={this.state.report_from} onDayChange={this.onChangeReportFrom}></DayPickerInput>
                            </Col>
                            <Col>
                                <Form.Label>To: </Form.Label>
                                <DayPickerInput value={this.state.report_to}  onDayChange={this.onChangeReportTo}></DayPickerInput>
                            </Col>
                            <Col>
                                <Form.Label>Hours: </Form.Label>
                                <Form.Control type='number'  value={this.state.report_hours} onChange={this.onChangeReportHours}></Form.Control>
                            </Col>
                        </Form.Row>
                    </Form.Group>
        
                    <Form.Group>
                        <Form.Row>
                        <Col>
                            <Button variant="primary" type="submit">Create Report</Button>
                        </Col> 
                        <Col>
                            <Button variant="danger" onClick={() => this.props.history.push('/reports')}>Cancel</Button>
                        </Col>
                        </Form.Row>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default EditReport;