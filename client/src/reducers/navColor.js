
const navColor = ( state = [], action ) => {
  switch ( action.type ) {
    case 'NAV_COLOR':
      return action.navColor
    default:
      return state;
  }
}

export default navColor 