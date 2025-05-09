import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarDays, Tag, User, UserCircle, Paperclip } from "lucide-react";
import { Task } from "@/state/api";

type Props = {
  task: Task;
};

const priorityColors = {
  Urgent: "bg-red-200 text-red-700",
  High: "bg-yellow-200 text-yellow-700",
  Medium: "bg-green-200 text-green-700",
  Low: "bg-blue-200 text-blue-700",
  default: "bg-gray-200 text-gray-700",
};

const statusColors = {
  "To Do": "#2563EB",
  "Work In Progress": "#059669",
  "Under Review": "#D97706",
  Completed: "#000000",
};

const TaskCard: React.FC<Props> = ({ task }) => {
  const priorityColor =
    priorityColors[task.priority as keyof typeof priorityColors];
  const statusColor = statusColors[task.status as keyof typeof statusColors];

  return (
    <div
      className={`max-w-sm overflow-hidden rounded-lg shadow-lg ${priorityColor} border-t-4 bg-white transition-all duration-300 hover:shadow-xl dark:bg-gray-800`}
    >
      <div className={`px-6 py-4 ${statusColor}`}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            ID: {task.id}
          </span>
          <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {task.status}
          </span>
        </div>
        <div className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
          {task.title}
        </div>
        <p className="text-base text-gray-700 dark:text-gray-300">
          {task.description || "No description provided"}
        </p>
      </div>

      {task.attachments && task.attachments.length > 0 && (
        <div className="px-6 py-4">
          <div className="mb-2 flex items-center">
            <Paperclip className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Attachments:
            </span>
          </div>
          <Image
            src={`https://pm-s3-bucket1.s3.ap-southeast-2.amazonaws.com/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName}
            width={400}
            height={200}
            className="rounded-md"
          />
        </div>
      )}

      <div className="px-6 py-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {task.tags ? (
            task.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                <Tag className="mr-1 inline h-3 w-3" />
                {tag.trim()}
              </span>
            ))
          ) : (
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              <Tag className="mr-1 inline h-3 w-3" />
              No Tags
            </span>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Start:</strong>{" "}
              {task.startDate
                ? format(new Date(task.startDate), "PP")
                : "Not Set"}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Due:</strong>{" "}
              {task.dueDate ? format(new Date(task.dueDate), "PP") : "Not Set"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>
              <strong>Author:</strong> {task.author?.username || "Unknown"}
            </span>
          </div>
          <div className="flex items-center">
            <UserCircle className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>
              <strong>Assignee:</strong>{" "}
              {task.assignee?.username || "Unassigned"}
            </span>
          </div>
        </div>
      </div>

      <div className={`bg-gray-100 px-6 py-4 dark:bg-gray-700`}>
        <span
          className={`mb-2 mr-2 inline-block rounded-full px-3 py-1 text-sm font-semibold text-white`}
        >
          {task.priority} Priority
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
