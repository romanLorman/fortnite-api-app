const addNews = (news) => ({ type: 'ADD_NEWS', news })

export const loadNews =
  () =>
  (dispatch, _, { client, api }) => {
    client.get(api.ALL_NEWS).then((data) => {
      dispatch(addNews(data.news.slice(0, 10)))
    })
  }
