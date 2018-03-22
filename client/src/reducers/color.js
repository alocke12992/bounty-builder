
const color = ( state = [], action ) => {
  switch ( action.type ) {
    case 'TOGGLE_COLOR':
      return action.color
    default:
      return state;
  }
}

export default color 