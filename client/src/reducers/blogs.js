const blogs = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.blogs;
    case 'ADD_BLOG':
      return [action.blog, ...state];
    default:
      return state;
  }
};

export default blogs;
