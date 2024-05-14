export const mapsReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_MAPS':
      return action.maps
    default:
      return state
  }
}
