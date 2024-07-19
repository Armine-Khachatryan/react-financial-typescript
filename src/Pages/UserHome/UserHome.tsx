import React from 'react'
import { UserHeader } from '../../Components/Layouts/UserHeader/UserHeader'
import { HomeCategories } from '../../Components/HomeCategories/HomeCategories'
import { Footer } from '../../Components/Layouts/Footer/Footer'

export const UserMain = () => {
    return (
        <div className="whole">
            <div>
                <UserHeader />
                <div className="user-home-main">
                    <HomeCategories />
                </div>
            </div>
            <Footer />
        </div>
    )
}

// export const UserMain = () => {
//     return (
//         <div>
//             <UserHeader />
//             <div className="user-home-main">
//                 <HomeCategories />
//             </div>
//             <Footer />
//         </div>
//     )
// }
//

