import Container from "@/components/Container";
import TaskCard from "@/components/TaskCard";
import ActivityItem from "@/components/ActivityItem";

export default function DashboardPage() {
    return (
      <Container>
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-[2fr_1fr] gap-8">
            <div className="bg-gray-800 p-6 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
              <div className="space-y-4"> 
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
              </div>              
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
      </Container>
    );
  }