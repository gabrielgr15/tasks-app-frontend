'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import Container from "@/components/Container";
import TaskCard from "@/components/TaskCard";
import Button from "@/components/Button";
import ActivityItem from "@/components/ActivityItem";
import CreateTaskModal from "@/components/CreateTaskModal";
import {fetcher} from "@/utils/fetcher";
import useSWR from "swr";
import { ITask, ITasksApiResponse } from "@/types";


export default function DashboardPage() {
  const { isAuthenticated, accessToken } = useAuth();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { data, error, isLoading } = useSWR<ITasksApiResponse>(
    accessToken ? [`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, accessToken]: null,
    fetcher
  )

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated) {
    return (
      <Container>
        <p className="text-xl text-center text-gray-500">Redirecting to login...</p>
      </Container>
    );
  }  

  if (isLoading) {
    return (
      <Container>
        <p className="text-xl text-center">Loading tasks...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className="text-xl text-center text-red-500">
          Error loading tasks: {error.message}
        </p>
      </Container>
    );
  }

  if (!data) {
    return <Container><p>No data available.</p></Container>;
  }


  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <div className="bg-gray-800 p-6 rounded-md">
          <Button onClick={() => setIsCreateModalOpen(true)}>{'Create new task'}</Button>
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          {data.tasks.length === 0 ? (
            <p className="text-gray-600">You have no tasks yet. Add one!</p>
          ) : (
            <div className="space-y-4">
                {data.tasks.map((task: ITask) => (
                <TaskCard
                  key={task._id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Recent activity</h2>
          <div className="space-y-3">
            <ActivityItem
              message="User Name completed task: 'Review Git workflow'."
              timestamp="2 hours ago"
            />
            <ActivityItem
              message="User Name updated task: 'Set up Dashboard UI'."
              timestamp="4 hours ago"
            />
            <ActivityItem
              message="User Name created a new task: 'Plan next steps for portfolio'."
              timestamp="Yeterday"
            />
          </div>
        </div>
      </div>
      {isCreateModalOpen && <CreateTaskModal onClose={() => setIsCreateModalOpen(false)}/>}
    </Container>
  );
}