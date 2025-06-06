import Container from "@/components/Container";

export default function DashboardPage() {
    return (
      <Container>
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-[2fr_1fr] gap-8">
            <div className="bg-gray-800 p-6 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
              <p className="text-gray-400">Tasks will go here...</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Recent activity</h2>
              <p className="text-gray-400">Activity feed will go here...</p>
            </div>
          </div>
      </Container>
    );
  }