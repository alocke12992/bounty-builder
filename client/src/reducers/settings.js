const settings = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_SETTINGS':
      return action.settings;
    default: 
      return state;
  }
}

export default settings;