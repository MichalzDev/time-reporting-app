import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import "bootstrap/dist/css/bootstrap.min.css";

import HomeScreen from './components/home-screen.component';

import CreateUser from './components/create-user.component';
import ReadUser from './components/read-user.component';
import EditUser from './components/edit-user.component';

import CreateProject from './components/create-project.component';
import ReadProject from './components/read-project.component';
import EditProject from './components/edit-project.component';
import CreateReport from './components/create-report.component';
import ReadReport from './components/read-report.component';
import EditReport from './components/edit-report.component';


class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" >Control panel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to='/users'>Users List</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/users/create'>Create User</Link></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Projects" id="basic-nav-dropdown">
                <NavDropdown.Item ><Link to='/projects'>Projects List</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/projects/create'>Create Project</Link></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Reports" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to='/reports'>Reports List</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/reports/create'>Create Report</Link></NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Navbar>
          <Route path='/' exact component = {HomeScreen} />
          <Route path='/users' exact component = {ReadUser} />
          <Route path='/users/create' exact component = {CreateUser} />
          <Route path='/users/edit/:id' exact component = {EditUser} />
          <Route path='/projects' exact component = {ReadProject} />
          <Route path='/projects/create' exact component = {CreateProject} />
          <Route path='/projects/edit/:id' exact component = {EditProject} />
          <Route path='/reports' exact component = {ReadReport} />
          <Route path='/reports/create' exact component = {CreateReport} />
          <Route path='/reports/edit/:id' exact component = {EditReport} />
        </Container>
      </Router>
    );
  }
}
export default App;
