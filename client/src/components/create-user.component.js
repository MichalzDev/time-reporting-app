import React, {Component} from 'react';

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
        console.log(`User Permissions: ${this.state.user_permissions}`);


        this.setState({
            user_login: '',
            user_password: '',
            user_name: '',
            user_role: '',
            user_permissions: '',
        })

    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>

                    <div className='form-group'>
                        <label>Name: </label>
                        <input type='text' className='form-control' value={this.state.user_name} onChange={this.onChangeUserName}></input>
                        <div className='form-row'>
                            <div className='col'>
                                <label>Login: </label>
                                <input type='text' className='form-control' value={this.state.user_login} onChange={this.onChangeUserLogin}></input>
                            </div>
                            <div className='col'>
                                <label>Password: </label>
                                <input type='text' className='form-control' value={this.state.user_password} onChange={this.onChangeUserPassword}></input>
                            </div>
                        </div>
                        <label>Role: </label>
                        <input type='text' className='form-control' value={this.state.user_role} onChange={this.onChangeUserRole}></input>
                        {/* <label>Permissions: </label>
                        <select className="form-control" onChange={this.onChangeUserPermissions}>
                            <option value='user'>User</option>
                            <option value='supervisor'>Supervisor</option>
                            <option value='admin'>Admin</option>
                        </select> */}
                    </div>
                    <div className='form-group'>
                        <div className='form-check form-check-inline'>
                            <input className='form-check-input' type='radio' name='permissions' id='permissionUser' value='user' checked={this.state.user_permissions==='user'} onChange={this.onChangeUserPermissions}></input>
                            <label className='form-check-label'>User</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input className='form-check-input' type='radio' name='permissions' id='permissionSupervisor' value='supervisor' checked={this.state.user_permissions==='supervisor'} onChange={this.onChangeUserPermissions}></input>
                            <label className='form-check-label'>Supervisor</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input className='form-check-input' type='radio' name='permissions' id='permissionAdmin' value='admin' checked={this.state.user_permissions==='admin'} onChange={this.onChangeUserPermissions}></input>
                            <label className='form-check-label'>Admin</label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create User' className='btn btn-primary' ></input>
                    </div>

                </form>
            </div>
        )
    }
}

export default CreateUser;