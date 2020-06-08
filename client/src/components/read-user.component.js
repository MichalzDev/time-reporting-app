import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
const User = (props) => (
  <tr>
    {/* <td>{props.user._id}</td> */}
    <td>{props.user.user_login}</td>
    <td>{props.user.user_name}</td>
    <td>{props.user.user_role}</td>
    {/* <td>{props.user.user_projects}</td> */}
    <td>{props.user.user_permissions}</td>
    <td>
      <Link to={"/users/edit/" + props.user._id}>Edytuj </Link>
      <a
        href="/users"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Usuń
      </a>
    </td>
  </tr>
);

class ReadUser extends Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  // componentDidCatch() {
  //     axios.get('http://localhost:5000/users/')
  //     .then(res => {
  //         this.setState({users: res.data})
  //     })
  //     .catch(function(err){
  //         console.log(err);
  //     })
  // }
  componentDidUpdate() {
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  deleteUser(id) {
    axios.delete("http://localhost:5000/users/delete/" + id).then((res) => {
      console.log(res.data);
    });
    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  }

  userList() {
    return this.state.users.map((el) => {
      return <User user={el} deleteUser={this.deleteUser} key={el._id}></User>;
    });
  }

  render() {
    return (
      <div>
        <h3>Lista Urzytkowników</h3>
        <Table striped bordered hover style={{ marginTop: 20 }}>
          <thead>
            <tr>
              {/* <th>id</th> */}
              <th>Login</th>
              <th>Imię</th>
              <th>Rola</th>
              {/* <th>Projects</th> */}
              <th>Uprawnienia</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </Table>
      </div>
    );
  }
}

export default ReadUser;
