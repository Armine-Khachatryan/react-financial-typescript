import React from 'react'
import { HomeMain } from '../../Components/HomeMain/HomeMain'
import { Footer } from '../../Components/Layouts/Footer/Footer'
import { Header } from '../../Components/Layouts/Header/Header'

export const Mainlayout = () => {
  return (
    <div>
        <Header />
        <HomeMain />
        <Footer />
    </div>
  )
}
