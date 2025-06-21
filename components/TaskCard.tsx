import { ITask } from "@/types"; 

interface TaskCardProps {
  task: ITask;
  onEditClick: () => void;
  onDeleteClick: () => void; 
}

export default function TaskCard({ task, onEditClick, onDeleteClick }: TaskCardProps) {
  return (
    <div className="bg-gray-700/50 p-4 rounded-md flex justify-between items-center transition-colors hover:bg-gray-700">

      <div className="flex-grow">
        <h3 className="font-bold text-white">{task.title}</h3>
        {task.description && <p className="text-sm text-gray-300">{task.description}</p>}
        <p className="text-xs text-gray-400 mt-1 capitalize">{task.status}</p>
      </div>

      <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
        <button
          onClick={onEditClick}
          aria-label={`Edit task ${task.title}`}
          className="p-2 rounded-full text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ✏️
        </button>

        <button
          onClick={onDeleteClick}
          aria-label={`Delete task ${task.title}`}
          className="p-2 rounded-full text-gray-400 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}