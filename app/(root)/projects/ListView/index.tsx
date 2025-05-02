import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTaskQuery } from "@/state/api";
import React from "react";
type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const List = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTaskQuery({ projectId: Number(id) });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fething tasks</div>;
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="col-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default List;
