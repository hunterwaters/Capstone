import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userToEdit) {
      this.setState({
        name: nextProps.userToEdit.name
      });
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { onSubmit, userToEdit, onEdit } = this.props;
    const { name } = this.state;

    if (!userToEdit) {
      axios
        .post("http://127.0.0.1:5000/api/v1/users", {
          name
        })
        .then(res => onSubmit(res.data))
        .then(() =>
          this.setState({
            name: ""
          })
        );
    } else {
      return axios
        .put(`http://127.0.0.1:5000/api/v1/users/${userToEdit._id}`, { name })
        .then(res => onEdit(res.data))
        .then(() => this.setState({ name: "" }));
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { name } = this.state;

    return (
      <div className="row">
        <h5 className="center blue-text">Add Users</h5>
        <div className="input-field col s12">
          <input
            onChange={ev => this.handleChangeField("name", ev)}
            value={name}
            type="text"
            placeholder="User Name"
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: "SUBMIT_USER", data }),
  onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data})
});

const mapStateToProps = state => ({
  userToEdit: state.home.userToEdit,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
