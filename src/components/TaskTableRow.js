import React, { Component } from 'react'
 // eslint-disable-next-line
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class TaskTableRow extends Component {
  constructor(props) {
    super(props)
    this.deleteTask = this.deleteTask.bind(this)
  }

  deleteTask() {
    axios
      .delete(
        'http://localhost:4000/tasks/delete-task/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('Task successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.FrontendURL}</td>
        <td>{this.props.obj.BackendURL}</td>
        <td>{this.props.obj.Batch}</td>
        <td>
           <Button onClick={this.deleteTask} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}
