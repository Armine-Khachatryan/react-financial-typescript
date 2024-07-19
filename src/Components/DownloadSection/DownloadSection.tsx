import React from 'react'
import './downloadsection.css'
import AppStoreIcon from "../../assets/images/appStore.png"
import GooglePlayIcon from "../../assets/images/GooglePlay.png"

export const DownloadSection = () => {
  return (
    <section className='download-section'>
        <div className="main-container">
            <div className="content">
                <h3>Download on</h3>
                <div className="apps-buttons">
                    <button className="appStore"><img src={AppStoreIcon} alt="App Store Icon" /></button>
                    <button className="appStore"><img src={GooglePlayIcon} alt="App Store Icon" /></button>
                </div>
            </div>
        </div>
    </section>
  )
}
