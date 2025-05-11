"use client";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";
import {
  Priority,
  Task,
  useGetAuthUserQuery,
  useGetTaskByUserQuery,
} from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import React, { useState } from "react";
type Props = {
  priority: Priority;
};
const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 130,
  },
];
const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const {
    data: currentUser,
    error,
    isLoading: Loading,
    isError,
    isSuccess,
  } = useGetAuthUserQuery({});

  console.log("isLoading:", Loading);
  console.log("isError:", isError);
  console.log("error:", error);
  console.log("isSuccess:", isSuccess);
  console.log("currentUser:", currentUser);

  const userId = currentUser?.userDetails?.userId ?? null;

  const {
    data: task,
    isLoading,
    isError: isTaskError,
  } = useGetTaskByUserQuery(userId || 0, {
    skip: !userId,
  });
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const filteredTasks = task?.filter((task) => task.priority === priority);
  if (isTaskError && !task) return <div>Error while fething task</div>;
  return (
    <div className="m-5 p-5">
      <ModalNewTask
        onClose={() => setIsModalNewTaskOpen(false)}
        isOpen={isModalNewTaskOpen}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${view === "list" ? "bg-gray-300" : "bg-white"}`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${view === "table" ? "bg-gray-300" : "bg-white"}`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading task...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" && (
          <DataGrid
            rows={filteredTasks}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.id}
            className={dataGridClassName}
            sx={dataGridSxStyles(isDarkMode)}
          />
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
