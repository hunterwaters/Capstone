import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment'

import UserForm from "../User/Form";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;
    axios("http://127.0.0.1:5000/api/v1/users").then(res => onLoad(res.data));
  }

  handleDelete(id) {
    const { onDelete } = this.props;
    return axios
      .delete(`http://127.0.0.1/api/v1/users/${id}`)
      .then(() => onDelete(id));
  }

  handleEdit(user) {
    const { setEdit } = this.props;
    setEdit(user);
  }

  render() {
    const { users, isLoading } = this.props;
    return (
      <div className="container">
        <div className="row">
          <h1 className="center blue-text"> Bunny Studio</h1>
          <UserForm />
        </div>
        <div className="row">
          <div className="col l12">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              users.map(user => {
                return (
                  <ul className="collection">
                    <li className="collection-item" key={user._id}>
                      {user.name}
                      <button
                        onClick={() => this.handleEdit(user)}
                        className="btn space"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.handleDelete(user._id)}
                        className="btn space"
                      >
                      &times;
                      </button>
                      <Link to={'/addTask/' + user._id}>
                        <button className="btn space">Add Task</button>
                      </Link>
                    </li>
                  </ul>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.home.users,
  isLoading: false
});

// user actions
const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: "HOME_PAGE_LOADED", data }),
  onDelete: id => dispatch({ type: "DELETE_USER", id }),
  setEdit: user => dispatch({ type: "SET_EDIT", user })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
