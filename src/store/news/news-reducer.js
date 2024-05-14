export const newsReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NEWS':
      return  action.news
    default:
      return state
  }
}
