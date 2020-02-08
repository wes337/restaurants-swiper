import React, { useState, useRef, useEffect } from 'react'
import Hammer from 'hammerjs'
import RestaurantCard from '../restaurant-card'
import './restaurant-swiper.scss'

function RestaurantSwiper(props) {
  const { restaurants, toggleRestaurantList } = props
  const [cards, setCards] = useState([])
  const [newCards, setNewCards] = useState([])
  const cardSwiperRef = useRef()

  useEffect(() => {
    if (newCards && newCards.length > 0) {
      newCards.forEach((card, index) => {
        card.style.zIndex = cards.length - index
        card.style.transform =
          'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)'
        card.style.opacity = (10 - index) / 10
      })
    }
  }, [newCards, cards])

  useEffect(() => {
    const cardElements = document.querySelectorAll('.restaurant__card')
    const newCardsElements = document.querySelectorAll('.restaurant__card:not(.removed)')
    setCards(cardElements)
    setNewCards(newCardsElements)
    cardSwiperRef.current.classList.add('loaded')
  }, [restaurants])

  useEffect(() => {
    cards.forEach((card) => {
      const hammertime = new Hammer(card)
  
      hammertime.on('pan', () => {
        card.classList.add('moving')
      })
  
      hammertime.on('pan', (event) => {
        if (event.deltaX === 0) return
        if (event.center.x === 0 && event.center.y === 0) return
  
        cardSwiperRef.current.classList.toggle('restaurant_love', event.deltaX > 0)
        cardSwiperRef.current.classList.toggle('restaurant_nope', event.deltaX < 0)
  
        const xMulti = event.deltaX * 0.03
        const yMulti = event.deltaY / 80
        const rotate = xMulti * yMulti
  
        event.target.style.transform =
          'translate(' +
          event.deltaX +
          'px, ' +
          event.deltaY +
          'px) rotate(' +
          rotate +
          'deg)'
      })
  
      hammertime.on('panend', (event) => {
        card.classList.remove('moving')
        cardSwiperRef.current.classList.remove('restaurant_love')
        cardSwiperRef.current.classList.remove('restaurant_nope')
  
        const moveOutWidth = document.body.clientWidth
        const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5
  
        event.target.classList.toggle('removed', !keep)
  
        if (keep) {
          event.target.style.transform = ''
        } else {
          const endX = Math.max(
            Math.abs(event.velocityX) * moveOutWidth,
            moveOutWidth
          )
          const toX = event.deltaX > 0 ? endX : -endX
          const endY = Math.abs(event.velocityY) * moveOutWidth
          const toY = event.deltaY > 0 ? endY : -endY
          const xMulti = event.deltaX * 0.03
          const yMulti = event.deltaY / 80
          const rotate = xMulti * yMulti
  
          event.target.style.transform =
            'translate(' +
            toX +
            'px, ' +
            (toY + event.deltaY) +
            'px) rotate(' +
            rotate +
            'deg)'
            const newCardsElements = document.querySelectorAll('.restaurant__card:not(.removed)')
            setNewCards(newCardsElements)
        }
      })
    })
  }, [cards])

  const handleClick = (event, love) => {
    event.preventDefault()

    var moveOutWidth = document.body.clientWidth * 1.5
    if (newCards.length <= 0) {
      return false
    }

    const card = newCards[0]
    card.classList.add('removed')

    if (love) {
      card.style.transform =
        'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)'
    } else {
      card.style.transform =
        'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)'
    }

    const newCardsElements = document.querySelectorAll('.restaurant__card:not(.removed)')
    setNewCards(newCardsElements)
  }

  return (
    <div className="restaurant__swiper" ref={cardSwiperRef}>
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
      <div className="restaurant__swiper__buttons">
        <button id="nope" onClick={event => handleClick(event, false)}>
          <i className="fa fa-remove"></i>
        </button>
        <button id="love" onClick={event => handleClick(event, true)}>
          <i className="fa fa-heart"></i>
        </button>
        <button onClick={() => toggleRestaurantList(true)}>
        <i className="fa fa-th-large"></i>
        </button>
      </div>
    </div>
  )
}

export default RestaurantSwiper
