import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

//! Action Methods
import { createUser } from '../actions/users';
//! Helper Methods
import { validate } from '../helpers/validate';
import { renderMultipleFields } from '../helpers/formField';
//! Form Fields
import userFields from '../helpers/data/userFields';

class UserCreate extends Component {
  constructor(props){
    super(props);

    this.state = { modal: false, message:null, error: null };
    this.CreateUserForm = this.CreateUserForm.bind(this);
  }

  renderModal(){
    const { modal, message, error } = this.state;
    if(!modal) return <div></div>;

    const color = error ? 'modal-danger' : 'modal-success'; 

    return(
      <Modal isOpen={this.state.modal} className={`${color} ${this.props.className}`}>
        <ModalHeader>Create User</ModalHeader>
          <ModalBody>
            {message}
          </ModalBody>
        <ModalFooter>
        { error ? 
          <Button color="secondary" onClick={() => this.setState({ modal: false })}>Ok</Button>:
          <Button color="secondary" onClick={() => this.props.history.push('/users')}>Ok</Button>
        }
        </ModalFooter>
      </Modal>
    );
  }

  async onSubmit(values, { setSubmitting }) {    
    try{
      setSubmitting(true);
      await this.props.createUser(values);
      this.setState({modal: true, message: 'User created successfully...', error: false });
    }catch(err){
      const { message } = err.response.data;
      this.setState({modal: true, message, error: true });
      setSubmitting(false);
    }
  }

  CreateUserForm(props) {
    const { handleSubmit, isSubmitting, isValid } = props;
    
    return (
      <Container>
        <Form onSubmit={handleSubmit} noValidate name='SignUpUserForm'>
          {renderMultipleFields(userFields, props)}
          <FormGroup>
            <Button type="submit" color="primary" className="mr-1" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Submit'}</Button>{' '}
            <Button type="reset" color="danger" className="mr-1" onClick={() => this.props.history.push('/users')}>Cancel</Button>
          </FormGroup>  
        </Form>
      </Container>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col sm={12} md={6} style={{flexBasis: 'auto'}}>
            <Card>
              <CardHeader>
                <i className="icon-note"></i><strong>SignUp User</strong>
              </CardHeader>
              <CardBody>
                <Formik
                  initialValues={initialValues}
                  validate={validate(validationSchema)}
                  onSubmit={this.onSubmit.bind(this)}
                  render={this.CreateUserForm}
                />  
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.renderModal()}
      </div>
    );
  }
}

const initialValues = {
  firstName: "",
  lastName: "",
  cellPhone: ""
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

export default connect(null,{createUser})(UserCreate);