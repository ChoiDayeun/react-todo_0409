import TodoList from "@/components/TodoList";

export default function Home() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 bg-gray-100 rounded-lg shadow-lg">
          <TodoList />
        </div>
      </div>
    );
  }