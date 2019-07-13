import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container, Card, CardHeader, CardBody, Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

//! Action Methods
import { updateUser, deleteUser } from '../actions/users';
//! Helper Methods
import { validate } from '../helpers/validate';
import { renderMultipleFields } from '../helpers/formField';
//! Form Data Fields
import userFields from '../helpers/data/userFields';

class UserEdit extends Component {
  constructor(props){
    super(props);

    this.state = { user: null, isDeleting: false, isUpdating: false, modal: false, message: null, error: false };
    this.UserEditForm = this.UserEditForm.bind(this);
  }

  componentWillMount(){
    const { match: { params } } = this.props;
    const { userId } = params;
    
    const { users } = this.props;
    const user = users.find(function({id}) {
      return id === userId;
    });

    this.setState({user});
  }

  renderModal(){
    const { modal, message, error } = this.state;
    if(!modal) return <div></div>;

    const color = error ? 'modal-danger' : 'modal-success'; 

    return(
      <Modal isOpen={this.state.modal} className={`${color} ${this.props.className}`}>
        <ModalHeader>User Update</ModalHeader>
          <ModalBody>
            {message}
          </ModalBody>
        <ModalFooter>
        { error ?
          <Button color="secondary" onClick={() => this.props.history.push('/')}>Ok</Button>: 
          <Button color="secondary" onClick={() => this.setState({ modal: false })}>Ok</Button>
        }
        </ModalFooter>
      </Modal>
    );
  }

  async onSubmit(values, { setSubmitting }) {    
    try{
      const { id } = this.props.user;

      setSubmitting(true);
      await this.props.updateUser(id, values);
      this.setState({modal: true, message: 'User updated successfully...', error: false });
      setSubmitting(false);
    }catch(err){
      const { message } = err.response.data;
      this.setState({modal: true, message, error: true });
    }
  }

  async onDelete() {
    try{
      const { id } = this.state.user;

      this.setState({isDeleting: true});
      await this.props.deleteUser(id);
      const message = 'User deleted successfully...';
      this.setState({modal: true, message, error: false });
    }catch(err){
      const { message } = err.response.data;
      this.setState({modal: true, message, error: true });
      this.setState({isDeleting: false});
    }
  }

  UserEditForm(props) {
    const { handleSubmit, isSubmitting, isValid } = props;
    const { isDeleting } = this.state;

    return (
      <Container>
        <Form onSubmit={handleSubmit} noValidate name='UserEditForm'>
          {renderMultipleFields(userFields, props )}
          <FormGroup>
            <Button type="submit" color="primary" className="mr-1" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Submit'}</Button>{' '}
            <Button color="danger" className="mr-1" disabled={isDeleting} onClick={() => this.onDelete()}>{isDeleting ? 'Wait...' : 'Delete'}</Button>
          </FormGroup>   
        </Form>
      </Container>
    );
  }

  render() {
    const { user }  = this.state;
    
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col sm={12} md={6} style={{flexBasis: 'auto'}}>
            <Card>
              <CardHeader>
                <i className="icon-note"></i><strong>User Edit</strong>
              </CardHeader>
              <CardBody>
                <Formik
                  initialValues={user}
                  validate={validate(validationSchema)}
                  onSubmit={this.onSubmit.bind(this)}
                  render={this.UserEditForm}
                />  
              </CardBody>
              {this.renderModal()}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const validationSchema = function (values) {
  return Yup.object().shape({
    firstName: Yup.string()
    .required('First name is required'),
    lastName: Yup.string()
    .required('Last name is required'),
    cellPhone: Yup.string()
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid cell phone number\n')
    .required('Cellphone number required'),
  })
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps,{updateUser, deleteUser})(UserEdit);