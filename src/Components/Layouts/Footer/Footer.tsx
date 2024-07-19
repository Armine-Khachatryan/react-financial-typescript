import React from 'react'
import './footer.css'
import twitterIcon from '../../../assets/images/twitter.png'
import facebookIcon from '../../../assets/images/facebook.png'
import linkedinIcon from '../../../assets/images/linkedin.png'

const footerMenu = [
  {
    title: 'Regulations',
    link: '/'
  },
  {
    title: 'Financial Mediator',
    link: '/'
  },
  {
    title: 'Financial reports',
    link: '/'
  },
  {
    title: 'Terms and conditions',
    link: '/'
  },
  {
    title: 'Limits and restrictions',
    link: '/'
  },
  {
    title: 'User rights',
    link: '/'
  },
  {
    title: 'Services',
    link: '/'
  },
  {
    title: 'Frequently Asked Questions',
    link: '/'
  },
  {
    title: 'Vacancies',
    link: '/'
  }
]

const socialLinks = [
  {
    title: 'Twitter',
    link: 'https://www.twitter.com',
    icon: twitterIcon
  },
  {
    title: 'Facebook',
    link: 'https://www.facebook.com',
    icon: facebookIcon
  },
  {
    title: 'Linkedin',
    link: 'https://www.linkedin.com',
    icon: linkedinIcon
  }
]
export const Footer = () => {
  return (
    <footer>
      <div className="main-container">
        <div className="footer-content">
          <div className="left-side">
          <ul className="column">
              {footerMenu.slice(0, 5).map((menuItem, index) => (
                <li key={index}><a href={menuItem.link}>{menuItem.title}</a></li>
              ))}
            </ul>
            <ul className="column">
              {footerMenu.slice(5).map((menuItem, index) => (
                <li key={index}><a href={menuItem.link}>{menuItem.title}</a></li>
              ))}
            </ul>
        </div>
        <div className="right-side">
          <div className="top">
            <a href="tel()" className="phone">+965 548 445</a>
            <span className="consultant">Consultant</span>
          </div>
          <div className="bottom">
            <a href="mailto:info@name.com" className="email">info@name.com</a>
            <div className="social-links">
              {socialLinks.map((socialLinks, index) => (
                <a href={socialLinks.link} key={index}><div className="social-item"><img src={socialLinks.icon} alt={socialLinks.title} /></div></a>
              ))}
            </div>
          </div>
        </div>
        </div>
        
      </div>
    </footer>
  )
}

