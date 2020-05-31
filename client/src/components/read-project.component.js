import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table'
const Project = props => (
    <tr>
        <td>{props.project.project_name}</td>
        <td>{props.project.project_members}</td>
        <td>
            <Link to={"/projects/edit/"+props.project._id}>Edit </Link>
            <a href='/projects' onClick={ ()=> {props.deleteProject(props.project._id)}}>Delete</a>
        </td>
    </tr>
)

class ReadProject extends Component {
   _isMounted = true;
    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
        this.state = {
            projects: [],
        }
    }



    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:5000/projects/')
        .then(res => {
            this.setState({projects: res.data})
        })
        .catch(function(err){
            console.log(err);
        })
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/projects/')
        .then(res => {
            this.setState({projects: res.data})
        })
        .catch(function(err){
            console.log(err);
        })
    }

    deleteProject(id){
        axios.delete('http://localhost:5000/projects/delete/'+id)
        .then(res => {console.log(res.data)});
        this.setState({
            projects: this.state.projects.filter(el=>el._id !== id)
        })
    }

    projectList(){
        return this.state.projects.map((el) => {
            return <Project project={el} deleteProject={this.deleteProject} key={el._id}></Project>
        });
    }

    render() {
        return(
            <div>
                <h3>Projects List</h3>
                <Table striped bordered hover style={{marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Members</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.projectList() }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ReadProject;