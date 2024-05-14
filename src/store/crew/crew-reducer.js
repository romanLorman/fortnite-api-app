export const crewReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_CREW':
      return action.crew
    default:
      return state
  }
}
