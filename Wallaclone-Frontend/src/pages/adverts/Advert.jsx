//Como el modelo de Advert

const Advert = ({ advert }) => {
  const { name, description, price, photo, type, owner } = advert

  return (
    <article className="advert">
      <div className="advert-details">
        <div>
          <img
            src={photo || 'http://placehold.co/400x200'}
            alt=""
            className="advert-photo"
          />
        </div>
        <h2 className="advert-name">{name}</h2>
        <p className="advert-description">{description}</p>
        <p className="advert-price">{price} Euros</p>
        <p className="advert-type">{type ? 'For sale' : 'For wanted'}</p>
        <p className="advert-owner">Owner: {owner}</p>
      </div>
    </article>
  )
}

export default Advert
