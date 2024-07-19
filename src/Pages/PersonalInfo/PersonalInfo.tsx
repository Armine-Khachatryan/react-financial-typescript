import React from 'react'
import { PersonalInfoContent } from '../../Components/PersonalInfoContent/PersonalInfoContent'
import { UserHeader } from '../../Components/Layouts/UserHeader/UserHeader'
import { Footer } from '../../Components/Layouts/Footer/Footer'

const PersonalInfoData = {
    name: 'Name Surname',
    birthDate: '12/06/1995',
    email: 'namesurname@gmail',
    phone: '+685 8455 445789'
}

export const PersonalInfo = () => {
    return (
        <div>
            <UserHeader />
            <div className="user-home-main">
                <PersonalInfoContent
                    name={PersonalInfoData.name}
                    birthDate={PersonalInfoData.birthDate}
                    email={PersonalInfoData.email}
                    phone={PersonalInfoData.phone}
                />
            </div>
            <Footer />
        </div>
    )
}

