const addMaps = (maps) => ({ type: 'ADD_MAPS', maps })

export const loadMaps =
  () =>
  (dispatch, _, { client, api }) => {
    client
      .get(api.ALL_MAPS)
      .then((data) => dispatch(addMaps(data.maps.reverse().slice(0, 14))))
  }
