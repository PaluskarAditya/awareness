import { Button } from '@/components/ui/button'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'

export default function EmailInfoCard({ getInitials, selectedEmail }) {
  return (
    <div className='flex flex-col dark:bg-black bg-white'>
      <div className='flex w-full justify-between dark:bg-black items-start p-4'>
        <div className='flex justify-between items-center gap-3 dark:bg-black'>
          <Avatar className='h-[40px] w-[40px]'>
            <AvatarFallback>{getInitials(selectedEmail.name)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col text-wrap gap-2'>
            <CardTitle className='text-md font-bold'>{selectedEmail.name}</CardTitle>
            <CardDescription className='-mt-2 text-sm font-medium'>{selectedEmail.subject}</CardDescription>
            <CardDescription className='-mt-2 dark:text-white text-sm text-black font-medium'>Reply-To: {selectedEmail.from}</CardDescription>
          </div>
        </div>
        <p className='text-sm'>{selectedEmail.date}, {selectedEmail.time}</p>
      </div>
      <Separator />
      <div
        dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
        className='p-4 dark:text-white dark:bg-black text-md tracking-tight text-black'
      ></div>

      <Separator />
      <div className='p-4 flex flex-col justify-center gap-2 items-end'>
        <Textarea placeholder={`reply to ${selectedEmail.name.split(" ")[0]}`}></Textarea>
        <Button variant={""} size={"sm"}>Send</Button>
      </div>
    </div>
  )
}
