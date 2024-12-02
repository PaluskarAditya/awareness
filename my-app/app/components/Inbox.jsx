"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArchiveIcon, Trash2 } from "lucide-react";
import EmailCard from "./EmailCard";
import EmailInfoCard from "./EmailInfoCard";

export default function Inbox() {
	const [mails, setMails] = useState([]); // State to store emails
	const [selectedEmail, setSelectedEmail] = useState(null); // Track selected email
	const socket = React.useRef(null); // Persistent socket connection

	const getInitials = (fullName) => {
		const nameParts = fullName.trim().split(" ");
		return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
	};

	useEffect(() => {
		// Establish a connection to the backend
		socket.current = io("http://localhost:8080");

		// Request inbox on connection
		socket.current.on("connect", () => {
			console.log("Connected to server");
			socket.current.emit("request_inbox");
		});

		// Listen for inbox updates
		socket.current.on("update_inbox", (inbox) => {
			console.log("Inbox updated:", inbox);
			setMails(inbox); // Update inbox state
		});

		// Clean up on component unmount
		return () => {
			socket.current.disconnect();
		};
	}, []);

	// Handle email click
	const handleEmailClick = (email) => {
		setSelectedEmail(email);
	};

	return (
		<div className="flex flex-col gap-2 p-3 dark:bg-black h-full">
			<ResizablePanelGroup direction="horizontal" className="flex gap-3">
				<ResizablePanel className="flex flex-col gap-3">
					<div className="flex gap-2 justify-between items-center">
						<SidebarTrigger />
						<Input placeholder="search" className="p-2 py-4 h-0" />
					</div>
					<ScrollArea className="h-full">
						{mails.length < 1 ? (
							<span className="w-full text-center">No emails in your inbox</span>
						) : (
							mails.map((email) => (
								<EmailCard
									key={email.timestamp}
									el={email}
									handleEmailClick={handleEmailClick}
									isSelected={selectedEmail?.timestamp === email.timestamp} // Highlight selected email
								/>
							))
						)}
					</ScrollArea>

				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel className="flex dark:bg-black flex-col border border-gray-200 dark:border-gray-900 rounded-lg h-max">
					<div className="p-2 gap-2 flex">
						<Button variant={"ghost"} className="p-2">
							<ArchiveIcon />
						</Button>
						<Button variant={"ghost"} className="p-2">
							<Trash2 />
						</Button>
					</div>
					<Separator />
					{selectedEmail ? (
						<EmailInfoCard getInitials={getInitials} selectedEmail={selectedEmail} />
					) : (
						<div className="p-4 text-center">
							<p>Select an email to see the details.</p>
						</div>
					)}
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
