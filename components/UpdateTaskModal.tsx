'use client'
import React, { useState } from "react"
import { useAuth } from "@/context/Authcontext"
import Button from "./Button"
import Input from "./Input"
import { mutate } from "swr"
import { ITask, ITasksApiResponse } from "@/types"

interface CreateTaskModalProps {
    onClose: () => void
    task: ITask
}

export default function UpdateTaskModal({ onClose, task }: CreateTaskModalProps) {
    const { accessToken } = useAuth()
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsSubmitting(true)

        const tasksKey = [`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, accessToken]

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/${task._id}`, {
                method: 'PATCH',
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
                const updatedTasks = currentData.tasks.map(existingTask => {
                    if (existingTask._id === data.task._id) {
                        return data.task;
                    }
                    return existingTask;
                });
                return {
                    ...currentData,
                    tasks: updatedTasks
                };
            }, false);
            onClose()

        } catch (error) {
            console.error("Failed to create task:", error);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">

            <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-xl w-96 max-w-full">

                <h2 className="text-2xl font-bold text-white mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <Input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <Input
                        type="text"
                        placeholder="Status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        disabled={isSubmitting}
                    />

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}