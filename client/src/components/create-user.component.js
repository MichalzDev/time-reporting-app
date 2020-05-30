import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'

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
            user_login: '',
            user_password: '',
            user_name: '',
            user_role: '',
            user_projects: [{name: 'Irys', id: 1},{name: 'Krokus', id: 2},{name: 'Dalia', id: 3}],
            user_permissions: '',
        }
    }

    onChangeUserLogin(e) {
        this.setState({
            user_login: e.target.value
        });
    }

    onChangeUserPassword(e) {
        this.setState({
            user_password: e.target.value
        });
    }

    onChangeUserName(e) {
        this.setState({
            user_name: e.target.value
        });
    }

    onChangeUserRole(e) {
        this.setState({
            user_role: e.target.value
        });
    }

    onChangeUserProjects(e) {
        this.setState({
            user_projects: [ ...e.target.value ]
        });
    }

    onChangeUserPermissions(e) {
        this.setState({
            user_permissions: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('Form submitted');
        console.log(`User Login: ${this.state.user_login}`);
        console.log(`User Password: ${this.state.user_password}`);
        console.log(`User Name: ${this.state.user_name}`);
        console.log(`User Role: ${this.state.user_role}`);
        console.log(`User Projects: ${this.state.user_projects}`);
        console.log(`User Permissions: ${this.state.user_permissions}`);


        this.setState({
            user_login: '',
            user_password: '',
            user_name: '',
            user_role: '',
            user_projects: [],
            user_permissions: '',
        })

    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Create New User</h3>
                <Form onSubmit={this.onSubmit}>

                    <Form.Group>
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type='text' value={this.state.user_name} onChange={this.onChangeUserName}></Form.Control>
                        <Form.Row>
                            <Col>
                                <Form.Label>Login: </Form.Label>
                                <Form.Control type='text' value={this.state.user_login} onChange={this.onChangeUserLogin}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Password: </Form.Label>
                                <Form.Control type='text' value={this.state.user_password} onChange={this.onChangeUserPassword}></Form.Control>
                            </Col>
                        </Form.Row>
                        <Form.Label>Role: </Form.Label>
                        <Form.Control type='text' value={this.state.user_role} onChange={this.onChangeUserRole}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check inline type="radio" label="User" name='permissions' id='permissionUser' value='user' checked={this.state.user_permissions==='user'} onChange={this.onChangeUserPermissions} />
                        <Form.Check inline type="radio" label="Supervisor" name='permissions' id='permissionSupervisor' value='supervisor' checked={this.state.user_permissions==='supervisor'} onChange={this.onChangeUserPermissions} />
                        <Form.Check inline type="radio" label="Admin" name='permissions' id='permissionAdmin' value='admin' checked={this.state.user_permissions==='admin'} onChange={this.onChangeUserPermissions} />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Create User</Button>
                        {/* <Button variant="primary" type="submit" href='/users/create'>Create User</Button> */}
                    </Form.Group>

                </Form>
            </div>
        )
    }
}

export default CreateUser;