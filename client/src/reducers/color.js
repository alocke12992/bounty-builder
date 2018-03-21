
const color = ( state = [], action ) => {
  switch ( action.type ) {
    case 'TOGGLE_COLOR':
      debugger
      return action.color
    default:
      return state;
  }
}

export default color 