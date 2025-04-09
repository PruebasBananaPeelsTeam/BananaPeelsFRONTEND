//Como el modelo de Advert

const Advert = ({ advert }) => {
  const { name, description, price, type, image, owner } = advert

  const baseURL = import.meta.env.VITE_API_URL

  const imageUrl = image
    ? `${baseURL}/images/${image}`
    : 'http://placehold.co/400x200'; 

  return (
    <article className="advert">
      <div className="advert-details">
        <div>
        <img
          src={imageUrl}
          alt=""
          className="advert-photo"
          />
        </div>
        <h2 className="advert-name">Name: {name}</h2>
        <p className="advert-description">Description: {description}</p>
        <p className="advert-price">Price: {price} €</p>
        <p className="advert-type">Type: {type ? 'For sale' : 'For wanted'}</p>
        <p className="advert-owner">Owner: {owner}</p>
      </div>
    </article>
  )
}

export default Advert
