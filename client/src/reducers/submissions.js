const submissions = (state = [], action) => {
  switch (action.type) {
    case 'GET_SUBMISSIONS':
      return action.submissions;
    case 'ADD_SUBMISSION':
      return [action.submission, ...state];
    default:
      return state;
  }
};

export default submissions;
