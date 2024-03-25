export const SlideNews = ({ parentBlock, data }) => {
  const eventDate = new Date(data.date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <li className={`${parentBlock}__slide-news slide-news`}>
      <div className="slide-news__title">{data.title} </div>
      <div className="slide-news__img">
        <img
          src={data.image}
          alt="slide-item-img"
          decoding="async"
          loading="lazy"
        />
      </div>
      <div className="slide-news__label">
        <span>{data.tabTitle}</span>
        <span>{eventDate}</span>
      </div>
      <p className="slide-news__text">{data.body}</p>
    </li>
  )
}
