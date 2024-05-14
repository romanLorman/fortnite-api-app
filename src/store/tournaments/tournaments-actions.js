const addTournaments = (tournaments) => ({
  type: 'ADD_TOURNAMENTS',
  tournaments,
})

export const loadTournaments =
  () =>
  (dispatch, _, { client, api }) => {
    client
      .get(api.ALL_TOURNAMENTS)
      .then((data) =>
        dispatch(addTournaments(data.events.reverse().slice(0, 14)))
      )
  }
