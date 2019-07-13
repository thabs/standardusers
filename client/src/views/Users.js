import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';

//! Action Methods
import { fetchUsers } from '../actions/users';

function UserRow(props) {
  const { key, user } = props;
  const userLink = `/users/edit/${user.id}`;

  const { firstName, lastName, cellPhone } = user;

  return (
    <tr key={key}>
      <td><Link to={userLink}>{firstName}</Link></td>
      <td><Link to={userLink}>{lastName}</Link></td>
      <td><Link to={userLink}>{cellPhone}</Link></td>
    </tr>
  )
}

class Users extends Component {
  async componentWillMount(){
    await this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
              </CardHeader>
              <CardBody>
                <h5><strong>Click on User to Edit</strong></h5>
                <br/>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Cell Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Button color="primary" className="mr-1" onClick={() => this.props.history.push('/users/new')}>Create User</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps, { fetchUsers })(Users);
