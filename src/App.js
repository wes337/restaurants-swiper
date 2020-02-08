import React, { useState, useEffect } from 'react'
import RestaurantSwiper from './components/restaurant-swiper'
import RestaurantList from './components/restaurant-list'
import data from './restaurants.json'
import './App.scss'

function App() {
  const [restaurants, setRestaurants] = useState(data.restaurants)
  const [search, setSearch] = useState('')
  const [restaurantList, setRestaurantList] = useState(false)

  const handleChange = event => {
    setSearch(event.target.value)
  }

  const clearSearch = () => {
    if (search.length > 0) {
      setSearch('')
    }
  }

  useEffect(() => {
    const searchResults = data.restaurants.filter(
      restaurant =>
        restaurant.name.toLocaleLowerCase().match(search.toLocaleLowerCase()) ||
        restaurant.tags.includes(search.toLocaleLowerCase()) ||
        restaurant.description
          .toLocaleLowerCase()
          .match(search.toLocaleLowerCase())
    )
    setRestaurants(searchResults)
  }, [search])

  const toggleRestaurantList = (context) => {
    setRestaurantList(context)
  }

  return (
    <div className="App">
      <header>
        <h1>Restaurants</h1>
        {restaurantList && (
        <div className="restaurant__search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
          />
          {search.length > 0 ? (
            <i
              className="fas fa-times-circle"
              onClick={clearSearch}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <i className="fas fa-search" />
          )}
        </div>
        )}
      </header>
      <main>
        {restaurantList
          ? <RestaurantList restaurants={restaurants} toggleRestaurantList={toggleRestaurantList} />
          : <RestaurantSwiper restaurants={restaurants} toggleRestaurantList={toggleRestaurantList} />
        }
      </main>
      <footer>
        <a href="http://wesley.codes" rel="noopener noreferrer" target="_blank">
          <span role="img" aria-label="Hey!">👋</span>
          Wesley Moses
        </a>
      </footer>
    </div>
  )
}

export default App
