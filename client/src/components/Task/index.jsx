import React from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      tasks: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const promises = Promise.all([
      axios.get(`http://127.0.0.1:5000/api/v1/users/${id}`),
      axios.get("http://127.0.0.1:5000/api/v1/tasks")
    ]);

    promises.then(([res1, res2]) => {
      console.log(res2.data);
      this.setState({
        user: res1.data.user.name,
        tasks: res2.data.allTasks
      });
    });
  }

  render() {
    const { user, tasks } = this.state;
    console.log(tasks);
    const id = this.props.match.params.id;
    if (user && tasks)
      return (
        <div className="container">
          <div className="row">
            <h1 className="center blue-text">Add User Task</h1>
          </div>
          <h5 className="center blue-text">Name:</h5>
          <h6 className="center teal-text">{user}</h6>
          <TaskForm id={id} />
          <div>
            <h5 className="teal-text">List of Tasks</h5>
            {tasks.map(task => {
              let element = '';
              if(task.state === true)
                element = 'done'
              else  element = 'todo'
              return (
                <ul className="collections" key={task._id}>
                  <li className="collection-item" >Description: {task.description}</li>
                  <li className="collection-item" >State: {element} </li>
                </ul>
              );
            })}
          </div>
        </div>
      );
    else {
      return (
        <div className="center blue-text">
          <h3>Loading...</h3>
        </div>
      );
    }
  }
}

export default Task;
