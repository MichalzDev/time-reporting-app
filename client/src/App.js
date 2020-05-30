import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import "bootstrap/dist/css/bootstrap.min.css";

import CreateUser from './components/create-user.component';
import ReadUser from './components/read-user.component';
import EditUser from './components/edit-user.component';


class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Control panel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to='/users'>Users</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/users/create'>Create User</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/users/edit:id'>EditUser</Link></NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Navbar>        
          <Route path='/users' exact component = {ReadUser} />
          <Route path='/users/create' exact component = {CreateUser} />
          <Route path='/users/edit:id' exact component = {EditUser} />
        </Container>
      </Router>
    );
  }
}
export default App;
