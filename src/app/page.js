import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full mx-auto mt-8">
      <div className="w-full md:w-3/5 mx-auto p-8 bg-gray-100 rounded-lg shadow-lg h-full">
        <TodoList />
      </div>
    </div>
  );
}