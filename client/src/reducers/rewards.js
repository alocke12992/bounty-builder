const rewards = (state = [], action) => {
  switch (action.type) {
    case 'GET_REWARDS':
      return action.rewards;
    case 'ADD_REWARD':
      return [action.reward, ...state];
    default:
      return state;
  }
};

export default rewards;
