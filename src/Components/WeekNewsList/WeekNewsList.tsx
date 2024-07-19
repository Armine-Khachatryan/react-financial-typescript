import React from 'react'
import './weeknewslist.css'
import home_card1 from '../../assets/images/home_card1.png'
import home_card2 from '../../assets/images/home_card2.png'
import home_card3 from '../../assets/images/home_card3.png'
import { WeekNewsItem } from '../WeekNewsItem/WeekNewsItem'

const newsList = [
  {
    id: 1,
    description: 'Memberships, fitness/mental health apps, supplements, Massages, Personal trainer/coach, Fitness Classes, Home exercise equipment, Aromatherapy.',
    image: home_card1,
    date: '18.06.24',
    url: 'https://www.google.com'
  },
  {
    id: 2,
    description: 'Memberships, fitness/mental health apps, supplements, Massages, Personal trainer/coach, Fitness Classes, Home exercise equipment, Aromatherapy.',
    image: home_card2,
    date: '18.06.24',
    url: 'https://www.google.com'
  },
  {
    id: 3,
    description: 'Memberships, fitness/mental health apps, supplements, Massages, Personal trainer/coach, Fitness Classes, Home exercise equipment, Aromatherapy.',
    image: home_card3,
    date: '18.06.24',
    url: 'https://www.google.com'
  },
]

export const WeekNewsList = () => {
  return (
    <section>
       <div className="main-container">
        <h1 className="week-news-title">Week News</h1>
        <div className='week-news-list'>
          {newsList.map((newsList) => (
            <WeekNewsItem 
              key={newsList.id}
              image={newsList.image}
              date={newsList.date}
              description={newsList.description}
              url={newsList.url}
              id={newsList.id}  />
          ))}
        </div>
      </div>
    </section>
   
    
  )
}
