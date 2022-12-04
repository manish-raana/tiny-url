import React, { useState, useEffect } from 'react'
import * as PushAPI from "@pushprotocol/restapi";
const Notifications = () => {
    const [showNotification, SetShowNotification] = useState(false);
    const [NotificationsList, SetNotificationsList] = useState([]);

  const getNotifications = async() => {
      try {
        const notifications = await PushAPI.user.getFeeds({
          user: "eip155:80001:0xBCed2e69B60bF6fa05408353651f9d4a71355b7B", // user address in CAIP
          env: "staging",
          spam: false,
        }); 
        console.log("notifications: ", notifications);
        SetNotificationsList(notifications);
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    getNotifications();
   },[]);
    return (
      <div
        className={
          "absolute ease-in-out delay-150 pt-10 duration-200 transition-[width] right-0 z-10 text-center p-2 h-screen showNotification bg-gray-100 " +
          (showNotification ? "w-1/4" : "w-10")
        }
      >
        <div className="open cursor-pointer" hidden={showNotification} onClick={() => SetShowNotification(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="close cursor-pointer" hidden={!showNotification} onClick={() => SetShowNotification(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <p hidden={!showNotification} className="text-center text-xl font-bold">
          Notifications
        </p>
        <div className="notifications-list h-full overflow-y-scroll" hidden={!showNotification}>
          {NotificationsList &&
            NotificationsList.map((item, index) => (
              <div
                key={index}
                className="h-28 border-2 border-gray-100 bg-green-100 rounded-xl shadow-md mx-2 my-3 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:scale-110"
              >
                <p>New Link generated for: </p>
                <p className="truncate px-5 w-full overflow-hidden cursor-pointer">
                  <a href={item.notification.body.split("Long Url:")[1]} target="_blank">
                    {item.notification.body.split("Long Url:")[1]}
                  </a>
                </p>
              </div>
            ))}
        </div>
      </div>
    );
}

export default Notifications