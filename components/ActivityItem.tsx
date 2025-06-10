import React from 'react';

interface ActivityItemProps {
    message: string;
    timestamp: string;
}

export default function ActivityItem({ message, timestamp }: ActivityItemProps) {
    return (
        <div className='bg-gray-700 p-3 rounded-md text-sm text-gray-200'>
            <p>{message}</p>
            <span className='text-xs text-gray-400 mt-1 block'>{timestamp}</span>
        </div>
    )
}