import React from 'react'
import "./personalInfo.css"
import userImage from "../../assets/images/personalInfo-userImage.png"
import editBtn from "../../assets/images/edit.png"

interface IPersonalInfo {
  name: string;
  birthDate: string;
  email: string;
  phone: string;
}

export const PersonalInfoContent = (props: IPersonalInfo) => {
  const { name, birthDate, email, phone } = props;
  return (
    <div className="personal-info-content">
      <div className='main-container'>
        <h1 className="title">Personal Info</h1>
        <div className="user-name">
          <img src={userImage} alt="user image" />
          <span>{name}</span>
        </div>
        <div className="user-details">
          <div className="user-details-item">
            <span>Birth date</span>
            <span>{birthDate}</span>
          </div>
          <div className="user-details-item">
            <span>Birth date</span>
            <span>{birthDate}</span>
          </div>
          <div className="user-details-item edit-button">
            <span>Email</span>
            <span>{email}
              <button><img src={editBtn} alt="editBtn" /></button>
            </span>
          </div>
          <div className="user-details-item edit-button">
            <span>Phone number</span>
            <span>{phone}
             <button><img src={editBtn} alt="editBtn" /></button>
            </span>
          </div>
        </div>
      </div>
    </div>
    
  )
}
