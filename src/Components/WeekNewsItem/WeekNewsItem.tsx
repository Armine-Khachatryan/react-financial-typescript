import React from 'react'
import './weeknewsitem.css'

interface INewsItem {
  id: number,
  description: string,
  image: string,
  date: string,
  url: string
}

export const WeekNewsItem = (props: INewsItem) => {
    const {id, description, image, date, url} = props
  return (
    <a href={url} key={id}>
        <div className='week-news-item'>
            <div className='week-news-item-image'><img src={image} alt="" /></div>
            <div className='week-news-item-detalis'>
                <div className="date">{date}</div>
                <div className="description">{description}</div>
            </div>
        </div>
    </a>
  )
}
