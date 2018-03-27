const buttonColor = ( state = [], action ) => {
  switch ( action.type ) {
    case 'BUTTON_COLOR':
      return action.buttonColor
    default:
      return state;
  }
}

export default buttonColor 