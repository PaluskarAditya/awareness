import React from 'react'
import EduCard from '../components/EduCard'

export default function Edu() {
  return (
    <div className='flex flex-col gap-3 p-3'>
      <div className='flex flex-col gap-2'>
        <h1>Courses</h1>
        <div className='grid grid-cols-3 gap-2'>
          <EduCard />
        </div>
      </div>
    </div>
  )
}
