'use client'

import React, { useState } from "react";
import { useAuth } from "@/context/Authcontext";
import Button from "./Button";
import { mutate } from "swr";
import { ITask, ITasksApiResponse } from "@/types";

interface DeleteTaskModalProps {
    onClose: () => void;
    task: ITask;
}

export default function DeleteTaskModal({ onClose, task }: DeleteTaskModalProps) {
    const { accessToken } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        setError(null);

        const tasksKey = [`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, accessToken];

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/${task._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete task');
            }

            mutate(tasksKey, (currentData: ITasksApiResponse | undefined) => {
                if (!currentData) return undefined;

                const updatedTasks = currentData.tasks.filter(
                    existingTask => existingTask._id !== task._id
                );

                return {
                    ...currentData,
                    tasks: updatedTasks,
                    totalTasks: currentData.totalTasks - 1
                };
            }, false);

            onClose();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-xl w-96 max-w-full text-center">

                <h3 className="text-xl font-bold text-white mb-2">Delete Task?</h3>

                <p className="mb-4 text-gray-300">
                    Are you sure you want to delete the task: <br />
                    <span className="font-semibold text-white mt-1 block">"{task.title}"</span>
                </p>

                <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>

                {error && <p className="text-red-400 mb-4">{error}</p>}

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteConfirm}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}