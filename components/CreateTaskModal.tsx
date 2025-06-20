'use client'
import React, { useState } from "react"
import { useAuth } from "@/context/Authcontext"
import Button from "./Button"
import Input from "./Input"
import { mutate } from "swr"
import { ITasksApiResponse } from "@/types"

interface CreateTaskModalProps {
    onClose: () => void
}

export default function CreateTaskModal({ onClose }: CreateTaskModalProps) {
    const {accessToken} = useAuth()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event : React.FormEvent) => {
        event.preventDefault()
        setIsSubmitting(true)

        const tasksKey = [`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, accessToken]

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ title, description, status }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create task'); 
            }
            await mutate(tasksKey, (currentData: ITasksApiResponse | undefined) => {
                if (!currentData) {
                    return undefined;
                }
                return {
                    ...currentData,
                    tasks: [data.task, ...currentData.tasks]
                };
            }, false)
            onClose()
            
        }catch(error){
            console.error("Failed to create task:", error);
        }finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full">
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Status (e.g., To Do, Urgent, Blocked)"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    />
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving task' : 'Save task'}
                        </Button>
                    </div>
                </form>                
            </div>            
        </div>
    )
}