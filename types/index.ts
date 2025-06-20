export interface ITask {
    _id: string;
    title: string;
    description?: string;
    status: string;
    user: string;
    createdAt: string;
    updatedAt: string;
  }

export interface ITasksApiResponse {
    tasks: ITask[];
    totalTasks: number;
}