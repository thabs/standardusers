import React, { Component } from 'react';

class Dashboard extends Component { 
  render() {
    return (
      <div className="animated fadeIn">
        <h3>Standard Users</h3>
        <br/>
        <h4>=> DB: MS SQL On Azure</h4>
        <h4>=> To Create/Edit User, click on Users on Sidebar</h4>
        <h5>  - To Edit User, click on user on Table, update and Submit</h5>
        <h5>  - To Delete User, click on user on Table, then Delete</h5>
        <br/>
        <h5>Developer: Thabiso Sekhoto</h5>
      </div>
    );
  }
}

export default Dashboard;
