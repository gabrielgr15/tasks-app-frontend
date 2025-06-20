import React from "react";


interface TaskCardProps {
    title: string,
    description?: string,
    status: string
}

export default function TaskCard({ title, description, status }: TaskCardProps) {  
  return (
    <div className="bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-300 text-sm mt-1">{description}</p>
        <p className="text-gray-300 text-sm mt-1">{status}</p>
      </div>
    </div>
  )
}