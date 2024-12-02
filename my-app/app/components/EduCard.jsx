import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlayCircleIcon } from 'lucide-react'

export default function EduCard() {
  return (
    <Card className='border-none'>
      <CardHeader className='p-2'>
        <img className='rounded-md' src='https://www.simplilearn.com/ice9/free_resources_article_thumb/Ethical_hacking_and_penetration_testing_guide.jpg' />
      </CardHeader>
      <CardContent className='p-0 flex justify-between items-center'>
        <div className='p-2 flex justify-center items-start flex-col'>
          <CardTitle>Phishing Course V2</CardTitle>
          <CardDescription className='w-1/2'>This is a Phishing course with Version 2</CardDescription>
        </div>
        <div className='p-2'>
          <button>
            <PlayCircleIcon className='text-white' />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
