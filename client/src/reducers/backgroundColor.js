const backgroundColor = ( state = [], action ) => {
  switch ( action.type ) {
    case 'BACKGROUND_COLOR':
      return action.backgroundColor
    default:
      return state;
  }
}

export default backgroundColor 