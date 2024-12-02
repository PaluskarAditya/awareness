"use client"

import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Table, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@radix-ui/react-avatar'
import { ArchiveIcon, Delete, DeleteIcon, Trash, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export default function Home() {
	const mails = [
		{
			"id": 1,
			"name": "John Doe",
			"from": "john.doe@example.com",
			"to": "jane.smith@example.com",
			"time": "2:30 PM",
			"date": "10/02/2024", // IST (12-hour format)
			"subject": "Meeting Reminder",
			"body": "Hi Jane,\n\nJust a reminder about our meeting tomorrow at 10 AM. Looking forward to discussing the project updates.\n\nBest,\nJohn"
		},
		{
			"id": 2,
			"name": "Alice Martin",
			"from": "alice.martin@example.com",
			"to": "bob.jones@example.com",
			"time": "4:00 PM",
			"date": "10/02/2024", // IST (12-hour format)
			"subject": "Lunch Plans",
			"body": "Hey Bob,\n\nWould you like to grab lunch today at noon? Let me know if you're free!\n\nCheers,\nAlice"
		},
		{
			"id": 3,
			"name": "Mike Green",
			"from": "mike.green@example.com",
			"to": "carol.white@example.com",
			"time": "4:45 PM",
			"date": "10/02/2024", // IST (12-hour format)
			"subject": "Project Deadline Update",
			"body": "Hi Carol,\n\nI wanted to update you on the project deadline. We're pushing it back by a week to accommodate the delays. I'll send out a new schedule soon.\n\nThanks,\nMike"
		},
		{
			"id": 4,
			"name": "Diana Blake",
			"from": "diana.blake@example.com",
			"to": "lucas.martin@example.com",
			"time": "7:30 PM",
			"date": "10/02/2024", // IST (12-hour format)
			"subject": "Feedback Request",
			"body": "Hello Lucas,\n\nI hope you're doing well. Could you please provide your feedback on the latest design draft? Your input would be greatly appreciated.\n\nBest regards,\nDiana"
		},
		{
			"id": 5,
			"name": "Julia Roberts",
			"from": "julia.roberts@example.com",
			"to": "joseph.kim@example.com",
			"time": "9:30 PM",
			"date": "10/02/2024", // IST (12-hour format)
			"subject": "Team Meeting Notes",
			"body": "Dear Joseph,\n\nI’ve attached the meeting notes from today’s team discussion. Please review them and let me know if you have any comments.\n\nBest,\nJulia"
		},
		{
			"id": 6,
			"name": "Chris White",
			"from": "chris.white@example.com",
			"to": "lucy.miller@example.com",
			"time": "8:00 AM",
			"date": "10/02/2024",
			"subject": "Morning Catch-up",
			"body": "Good morning, Lucy!\n\nI wanted to quickly catch up on the project status. Can we meet today around 10 AM?\n\nBest regards,\nChris"
		},
		{
			"id": 7,
			"name": "Susan Lee",
			"from": "susan.lee@example.com",
			"to": "paul.brown@example.com",
			"time": "11:00 AM",
			"date": "10/02/2024",
			"subject": "Budget Approval",
			"body": "Hi Paul,\n\nJust following up on the budget approval. Have you had a chance to review the numbers?\n\nCheers,\nSusan"
		},
		{
			"id": 8,
			"name": "Tom Johnson",
			"from": "tom.johnson@example.com",
			"to": "emma.white@example.com",
			"time": "12:30 PM",
			"date": "10/02/2024",
			"subject": "Client Call Summary",
			"body": "Hello Emma,\n\nI’ve attached the notes from today’s client call. Please let me know if you need any further details.\n\nBest,\nTom"
		},
		{
			"id": 9,
			"name": "Olivia Martin",
			"from": "olivia.martin@example.com",
			"to": "daniel.harris@example.com",
			"time": "1:00 PM",
			"date": "10/02/2024",
			"subject": "Team Event Planning",
			"body": "Hi Daniel,\n\nWe need to start planning for the upcoming team event. Do you have any ideas?\n\nBest regards,\nOlivia"
		},
		{
			"id": 10,
			"name": "Jake Rodgers",
			"from": "jake.rodgers@example.com",
			"to": "megan.smith@example.com",
			"time": "2:00 PM",
			"date": "10/02/2024",
			"subject": "Vendor Contract Update",
			"body": "Hi Megan,\n\nI’ve just reviewed the vendor contract and added my comments. Please review them and get back to me.\n\nThanks,\nJake"
		}
	];

	// State to track the selected email
	const [selectedEmail, setSelectedEmail] = useState(null);

	// Handle email click
	const handleEmailClick = (email) => {
		setSelectedEmail(email);
	};

	return (
		<div className='flex flex-col gap-2'>
			<ResizablePanelGroup direction='horizontal' className='flex gap-3'>
				<ResizablePanel className='flex flex-col gap-3'>
					<div>
						<Input placeholder='search' className='p-2 py-4 h-0' />
					</div>
					<ScrollArea className='h-full -mt-2'>
						{
							mails.map(el => (
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
													<CardDescription className='-mt-2 text-sm font-medium'>{el.from}</CardDescription>
												</div>
											</div>
											<CardDescription className='inline'>{el.time}</CardDescription>
										</div>
									</CardHeader>
									<CardContent className='p-2'>
										<p className='text-sm'>{el.body}</p>
									</CardContent>
								</Card>
							))
						}
					</ScrollArea>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel className='flex flex-col border border-gray-200 dark:border-gray-900 rounded-lg h-max'>
					<div className='p-2 gap-2 flex'>
						<Button variant={"ghost"} className='p-2'>
							<ArchiveIcon />
						</Button>
						<Button variant={"ghost"} className='p-2'>
							<Trash2 />
						</Button>
					</div>
					<Separator />

					{/* Show selected email details */}
					{selectedEmail ? (
						<div className='flex flex-col'>
							<div className='flex w-full justify-between items-start p-4'>
								<div className='flex flex-col text-wrap gap-2'>
									<CardTitle className='text-md font-bold'>{selectedEmail.name}</CardTitle>
									<CardDescription className='-mt-2 text-sm font-medium'>{selectedEmail.subject}</CardDescription>
									<CardDescription className='-mt-2 text-sm text-black font-medium'>Reply-To: {selectedEmail.from}</CardDescription>
								</div>
								<p className='text-sm'>{selectedEmail.date}, {selectedEmail.time}</p>
							</div>
							<Separator />
							<div className='p-4 text-md tracking-tight'>
								{selectedEmail.body}
							</div>
							<Separator />
							<div className='p-4 flex flex-col justify-center gap-2 items-end'>
								<Textarea placeholder={`reply to ${selectedEmail.name.split(" ")[0]}`}></Textarea>
								<Button variant={""} size={"sm"}>Send</Button>
							</div>
						</div>
					) : (
						<div className='p-4 text-center'>
							<p>Select an email to see the details.</p>
						</div>
					)}
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
