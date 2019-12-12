const User = require("../models/User");

const usersController = {
  /**
   * @params {object} req
   * @params {object} res
   * @returns {object} user object
   */
  create(req, res) {
    if (!req.body.name) {
      return res.status(400).json({ message: "Name is required!" });
    }
    const user = new User(req.body);
    user
      .save()
      .then(result => {
        res.status(201).json({ message: "One User Added!", user: result });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "An Error Ocurred Saving to the Database!" });
      });
  },
  /**
   * @params {object} req
   * @params {object} res
   * @returns {object} user object
   */
  getOneUser(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "User not found!"
      });
    }
    User.findById({ _id: id })
      .then(user => {
        res.status(200).json({
          message: "One User Found",
          user
        });
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  },
  /**
   * @params {object} req
   * @params {object} res
   * @returns {object} users array
   */
  getAllUsers(req, res) {
    User.find()
      .then(users => {
        if (users) {
          res.status(200).json({
            users
          });
        } else {
          res.status(404).json({
            message: "No Users Available at the Moment!"
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        });
      });
  },
  /**
   * @params {object} req
   * @params {object} res
   * @returns {void} status code 204
   */
  deleteUser(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: "user not found!"
      });
    }
    User.findOneAndDelete({ _id: id })
      .then(response => {
        res.status(204).json({ response });
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        });
      });
  },
  /**
   * @params {object} req
   * @params {object} res
   * @returns {object} user object
   */
  updateUser(req, res) {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({
        message: "User not Found!"
      });
    }
    User.findOneAndUpdate(
      { _id: id },
      {
        $set: req.body
      },
      (err, doc) => {
        if (err) {
          res.status(400).json({
            err
          });
        } else {
          res.status(201).json({
            message: "Updated One User",
            user: doc
          });
        }
      }
    );
  },
  /**
   * @params {object} req
   * @params {object} res
   * @returns {objec} tasks array
   */
  tasksByUser(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        message: "Oops! User not Found!"
      });
    }
    User.findById(id)
      .populate("tasks")
      .then(results => {
        res.status(200).json({
          Tasks: results
        });
      })
      .catch(err => {
        err;
      });
  }
};

module.exports = usersController;
