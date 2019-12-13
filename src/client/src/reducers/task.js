export default (state = {tasks: []}, action) => {
    switch (action.type) {
      case "TASKS_FETCHED":
        return {
          ...state,
          tasks: action.data.tasks
        };
        case 'SUBMIT_TASK':
        return {
          ...state,
          tasks: ([action.data.tasks]).concat(state.tasks)
        };
      default:
        return state;
    }
  };
  