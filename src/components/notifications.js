import React, { useState } from 'react'

const Notifications = () => {
    const [showNotification, SetShowNotification] = useState(false);
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div className="h-28 cursor-pointer border-2 border-gray-100 bg-green-100 rounded-xl shadow-md mx-2 my-3 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:scale-110">
              <p>A new link generated</p>
              <p>url: https://google.com/</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Notifications