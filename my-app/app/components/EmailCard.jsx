import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function EmailCard({ el, handleEmailClick }) {
  return (
    <Card
      className='my-2 cursor-pointer'
      key={el.subject}
      onClick={() => handleEmailClick(el)} // Set selected email on click
    >
      <CardHeader className='p-2 flex'>
        <div className='flex justify-between items-center gap-2'>
          <div className='flex justify-start items-center gap-3'>
            <div className='flex flex-col gap-2'>
              <CardTitle className='text-md font-bold'>{el.subject}</CardTitle>
              <CardDescription className='-mt-2 text-md text-white font-medium'>{el.name}</CardDescription>
              <CardDescription className='-mt-2 text-sm font-medium'>{el.from}</CardDescription>
            </div>
          </div>
          <CardDescription className='inline'>{el.time}</CardDescription>
        </div>
      </CardHeader>
      {/* <CardContent className='p-2'>
        <p className='text-sm'>{el.body}</p>
      </CardContent> */}
    </Card>
  )
}
