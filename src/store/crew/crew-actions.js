const addCrew = (crew) => ({ type: 'ADD_CREW', crew })

export const loadCrew =
  () =>
  (dispatch, _, { client, api }) => {
    client
      .get(api.ALL_CREW)
      .then((data) =>
        dispatch(addCrew(data.history.filter((crew) => crew.video)))
      )
  }
