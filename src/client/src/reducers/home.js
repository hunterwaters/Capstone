export default (state = {users: []}, action) => {
    switch (action.type) {
      case "HOME_PAGE_LOADED":
        return {
          ...state,
          isLoading: false,
          users: action.data.users
        };
      case 'SUBMIT_USER':
        return {
          ...state,
          users: ([action.data.users]).concat(state.users)
        };
      case 'DELETE_USER':
        return {
          ...state,
          users: state.users.filter(user => user._id !== action.id)
        };
      case 'SET_EDIT':
        return {
          ...state,
          userToEdit: action.user
        };
      case 'EDIT_USER':
        return {
          ...state,
          users: state.users.map(user => {
            if(user._id === action.data.user._id){
              return {
                ...action.data.user
              }
            }
            return user
          }),
          userToEdit: undefined,
        }
      default:
        return state;
    }
  };
  