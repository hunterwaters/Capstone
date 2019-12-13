const Task = require("../models/Tasks");
const User = require("../models/User");

const tasksController = {
  /**
   * @params {object} req
   * @params {object} res
   * @return {object} task object
   */
  createTask: async (req, res) => {
    const { id } = req.params;
    
    if(!id){
      res.status(404).json({
        message: 'Not allowed!'
      })
    }
    const { description, state } = req.body;
    const task = new Task({
      description,
      state,
      user: id
    });

    await task.save();

    const userById = await User.findById({ _id: id })

    userById.tasks.push(task)

    await userById.save()

    return res.status(201).json({
      tasks: userById
    })
  },
  /**
   * @params {object} req
   * @params {object} res
   * @returns {object} user object
   */
  userByTasks: async (req, res) => {
    const { id } = req.params;

    const userByTasks = await User.findById({_id: id}).populate('user')

    res.status(200).json({ userByTasks })
  },
  getAllTasks: async (req,res) => {
    const allTasks = await Task.find()
    res.status(200).json({ allTasks })
  },
  getTaskById: async (req,res) => {
    const { id } = req.params;
    const getTaskById = await User.findById({_id: id})
    res.status(200).json({ getTaskById })
  }

};

module.exports = tasksController;
