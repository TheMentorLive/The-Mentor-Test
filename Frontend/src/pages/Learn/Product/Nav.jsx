import React from 'react'

const Nav = () => {
  return (
    <div>
         <header className="fixed top-0 left-0 w-full bg-[#2563EB] z-50 h-16 md:h-14 lg:h-14 md:-mt-2 lg:-mt-2">

         <div className="container mx-auto flex ml-[105px]  mt-3 items-center">
  <h1 className="text-2xl text-white font-bold">Learning Python for Data Analysis</h1>
  <div className="text-sm text-white">
    <span className="ml-7"> (276,103 ratings) </span>
    <span>|</span>
    <span className="ml-2">1,671 Students</span>
  </div>
  </div>
        </header>
    </div>
  )
}

export default Nav

