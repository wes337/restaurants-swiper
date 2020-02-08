import React from 'react'
import RestaurantCard from '../restaurant-card'
import './restaurant-list.scss'

function RestaurantList(props) {
  const { restaurants, toggleRestaurantList } = props

  return (
    <div className="restaurant__list">
      <div className="restaurant__cards">
        {restaurants.length <= 0 ? (
          <p>No restaurants found...</p>
        ) : (
          restaurants.map(restaurant => (
            <RestaurantCard
              key={`${restaurant.name}-${restaurant.location[0]}-${restaurant.location[1]}`}
              restaurant={restaurant}
            />
          ))
        )}
      </div>
      <div className="restaurant__swiper__button">
        <button onClick={() => toggleRestaurantList(false)}>
        <i className="fa fa-th-large"></i>
        </button>
      </div>
    </div>
  )
}

export default RestaurantList
