import React from 'react'
import './homemain.css'
import { WeekNewsList } from '../WeekNewsList/WeekNewsList'
import { DownloadSection } from '../DownloadSection/DownloadSection'
import { HomeCategories } from '../HomeCategories/HomeCategories'

export const HomeMain = () => {
  return (
    <>
        <section>
        <div className="page_main">
            <div className="page_main-content">
            <div className="page_main-content_text">
                A concise and compelling <span className="bold">headline or text</span> that quickly communicates the website's
                value
                proposition or <span className="bold">key message.</span>
            </div>
            </div>
        </div>
        </section>
        <HomeCategories />
        <WeekNewsList />
        <DownloadSection />
    </>
    
  )
}
