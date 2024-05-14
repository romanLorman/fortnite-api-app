export const tournamentsReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_TOURNAMENTS':
      return action.tournaments
    default:
      return state
  }
}
