import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import CreateUser from './components/create-user.component';
import ReadUser from './components/read-user.component';
import EditUser from './components/edit-user.component';


class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <nav className='navbar navbar-expand-lg navbar-light bg-light' expand='lg'>
            <Link to='/' className='navbar-brand'>Control panel</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id="navbarSupportedContent">
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <Link to='/users' className='nav-link'>Users</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/users/create' className='nav-link'>Create users</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/users/edit:id' className='nav-link'>Edit user</Link>
                </li>
              </ul>
            </div>
            
          </nav>         
          <Route path='/users' exact component = {ReadUser} />
          <Route path='/users/create' exact component = {CreateUser} />
          <Route path='/users/edit:id' exact component = {EditUser} />
        </div>
      </Router>
    );
  }
}
export default App;
