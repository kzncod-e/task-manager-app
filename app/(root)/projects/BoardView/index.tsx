/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetTaskQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React, { useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { Ellipsis, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

// Props type definition
// - id: The project ID
// - setIsModalNewTaskOpen: Function to open/close the task modal
type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

// Define task statuses (columns)
const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const Board = ({ id, setIsModalNewTaskOpen }: Props) => {
  // Fetch tasks from the API based on project ID
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTaskQuery({ projectId: Number(id) });

  // Mutation function to update task status
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  // Function to move a task to a new status
  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  // Show loading message if data is still being fetched
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An Error Occurred While Fetching Tasks </div>;
  return (
    // DndProvider enables drag-and-drop functionality across the board
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={
              status as
                | "To Do"
                | "Work In Progress"
                | "Under Review"
                | "Completed"
            }
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

// Props for each task column
type TaskColumnProps = {
  status: "To Do" | "Work In Progress" | "Under Review" | "Completed";
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  // useDrop hook makes the column a drop target
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task", // Accepts only draggable elements of type "task"
    drop: (item: { id: number }) => moveTask(item.id, status), // Calls moveTask when dropped
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(), // Tracks whether a task is being dragged over
    }),
  }));

  // Count tasks for this specific status
  const tasksCount = tasks.filter((task) => task.status === status).length;

  // Status colors for the left indicator
  const statusColor = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      // Attach the drop functionality to this column
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      {/* Column Header with Status Indicator */}
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {/* status dapet dari paling atas */}
            {status}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <Ellipsis size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};
type TaskProps = {
  task: TaskType;
};
const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task", // Accepts only draggable elements of type "task"
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(), // Tracks whether a task is being dragged over
    }),
  }));
  const taskTagsSplit = task.tags ? task.tags.split(",") : [];
  const formatttedStartDate = task.startDate
    ? format(new Date(task.startDate), "p")
    : "";
  const numberOfCommets = (task.comments && task.comments.length) || 0;
  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => {
    if (!priority) return null;

    const priorityStyles = {
      Urgent: "bg-red-200 text-red-700",
      High: "bg-yellow-200 text-yellow-700",
      Medium: "bg-green-200 text-green-700",
      Low: "bg-blue-200 text-blue-700",
      default: "bg-gray-200 text-gray-700",
    };
    return (
      <div
        className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityStyles[priority] || priorityStyles.default}`}
      >
        {priority}
      </div>
    );
  };
  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`rounbded-md mb-4 bg-white shadow dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        ></Image>
      )}
      <div className="md:-6 p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-300 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
