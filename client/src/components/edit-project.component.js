import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import axios from 'axios';

class EditProject extends Component {
    _isMounted = true;
    constructor(props) {
        super(props);

        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeProjectMembers = this.onChangeProjectMembers.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            project_name: '',
            project_members: [],
        }
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                project_name: res.data.project_name,
                project_members: res.data.project_members,
            })
        })
        .catch(function(err) {
            console.log(err);
        })
    }
    onChangeProjectName(e) {
        this.setState({
            project_name: e.target.value
        });
    }

    onChangeProjectMembers(e) {
        this.setState({
            project_members: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            project_name: this.state.project_name,
            project_members: this.state.project_members,
        }

        axios.post('http://localhost:5000/projects/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));

        this.props.history.push('/projects');
        
        this.setState({
            project_name: '',
            project_members: [],
        })

    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Create New Project</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>Name: </Form.Label>
                                <Form.Control type='text' value={this.state.project_name} onChange={this.onChangeProjectName}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Members: </Form.Label>
                                <Form.Control type='text' value={this.state.project_members} onChange={this.onChangeProjectMembers}></Form.Control>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Update Project</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default EditProject;