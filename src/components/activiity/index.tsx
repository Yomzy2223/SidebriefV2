import React from 'react'
import { FlutterwaveIcon, ProfileIcon } from '@/assets/images'
import ActivityCard from './activity'

const NotificationData =  [
    {
        icon: ProfileIcon,
        message: "New message from Sayo oil and gas: Hey, whats up? All set for the presentation? ",
        duration:"a moment ago", 
    },

    {
        icon: ProfileIcon,
        message: "Olabisi Adeseye registered to become a partner.",
        duration:"a moment ago"
    },

    {
        icon: ProfileIcon,
        message: "Olabisi Adeseye registered to become a partner.",
        duration:"a moment ago"
    },

    {
        icon: ProfileIcon,
        message: "New message from Sayo oil and gas: Hey, whats up? All set for the presentation? ",
        duration:"a moment ago", 
    },

]

const Activity = () => {
  return (
    <div className="">
        {NotificationData.map((data, index) => (
            <ActivityCard key={index} {...data}/>
        )) 
        }
    </div>
  )
}

export default Activity