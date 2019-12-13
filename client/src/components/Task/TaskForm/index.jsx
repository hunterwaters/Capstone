import React from 'react';
import axios from 'axios';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      state: ''
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev){
    const { id } = this.props
    const { description, state } = this.state;
    ev.preventDefault();
    axios.post(`http://localhost:5000/api/v1/tasks/${id}`, {
      description,
      state,
    }).then(() => {
      this.setState({
        description: '',
        state: '',
      })
    })
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { description, state } = this.state;
    return (
     <div className="row">
        <div className="input-field col s12">
          <input
            onChange={ev => this.handleChangeField("description", ev)}
            value={description}
            type="text"
            placeholder="Description"
          />
          <input
            onChange={ev => this.handleChangeField("state", ev)}
            value={state}
            type="text"
            placeholder="Please Input True if Done or False If TODO"
          />
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default TaskForm;