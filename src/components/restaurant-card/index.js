import React from 'react'
import './restaurant-card.scss'

function RestaurantCard(props) {
  const {
    restaurant: { image, name, description, delivery_price, currency, tags },
  } = props

  return (
    <div className="restaurant__card">
      <div className="restaurant__card__image--container">
        <img src={image} alt="" />
      </div>
      <div className="restaurant__card__content">
        <div>
          <p className="card__title">{name}</p>
          <p className="card__price">
            {(delivery_price / 100).toFixed(2)} {currency === 'EUR' ? <>&euro;</> : currency}
          </p>
        </div>
        <div className="card__info">
          <p className="card__description">{description}</p>
        </div>
        <div className="card__tags">
          {tags.length > 0 && tags.map(tag => <p className="card__tag">{tag}</p>)}
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
