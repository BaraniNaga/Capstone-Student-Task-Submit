import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EditTask extends Component {

  constructor(props) {
    super(props)

    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.onChangeTaskEmail = this.onChangeTaskEmail.bind(this);
    this.onChangeTaskFrontendURL = this.onChangeTaskFrontendURL.bind(this);
    this.onChangeTaskBackendURL = this.onChangeTaskBackendURL.bind(this);
    this.onChangeTaskBatch = this.onChangeTaskBatch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      email: '',
      FrontendURL: '',
      BackendURL: '',
      Batch: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/tasks/edit-task/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          FrontendURL: res.data.FrontendURL,
          BackendURL: res.data.BackendURL,
          Batch: res.data.Batch
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeTaskName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeTaskEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeTaskFrontendURL(e) {
    this.setState({ FrontendURL: e.target.value })
  }

  onChangeTaskBackendURL(e) {
    this.setState({ BackendURL: e.target.value })
  }

  onChangeTaskBatch(e) {
    this.setState({ Batch: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const taskObject = {
      name: this.state.name,
      email: this.state.email,
      FrontendURL: this.state.FrontendURL,
      BackendURL: this.state.BackendURL,
      Batch: this.state.Batch
    };

    axios.put('http://localhost:4000/tasks/update-task/' + this.props.match.params.id, taskObject)
      .then((res) => {
        console.log(res.data)
        console.log('Task successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Task List 
    this.props.history.push('/task-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeTaskName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeTaskEmail} />
        </Form.Group>

        <Form.Group controlId="FrontendURL">
          <Form.Label>FrontendURL</Form.Label>
          <Form.Control type="text" value={this.state.FrontendURL} onChange={this.onChangeTaskFrontendURL} />
        </Form.Group>

        <Form.Group controlId="BackendURL">
          <Form.Label>BackendURL</Form.Label>
          <Form.Control type="text" value={this.state.BackendURL} onChange={this.onChangeTaskBackendURL} />
        </Form.Group>

        <Form.Group controlId="Batch">
          <Form.Label>Batch</Form.Label>
          <Form.Control type="text" value={this.state.Batch} onChange={this.onChangeTaskBatch} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Task
        </Button>
      </Form>
    </div>);
  }
}