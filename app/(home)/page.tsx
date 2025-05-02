"use client";
import React from "react";

import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTaskQuery,
} from "@/state/api";
import { useAppSelector } from "@/app/redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "@clerk/nextjs";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";

const Home = () => {
  const { userId } = useAuth();
  const {
    data: tasks,
    isError: tasksError,
    isLoading: taskLoading,
  } = useGetTaskQuery({ projectId: parseInt("1") });
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  if (taskLoading || isProjectsLoading) {
    return <div>Loading...</div>;
  }
  if (tasksError || !tasks || !projects) {
    return <div>Error loading tasks</div>;
  }
  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );
  console.log(userId, "userId");

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );
  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));
  const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 200 },
  ];
  const COLORS = ["#0088fe", "#00C49F", "#FFBB28", "#FF0042"];
  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90e2",
        text: "#fffff",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82CA9D",
        text: "#000000",
      };
  return (
    <div className="container h-full w-[100%] items-center bg-gray-100 bg-transparent p-8">
      <Header name="Project Management Dashboard" />
      <div className="grid w-[100%] grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray={"3 3"}
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey={"name"} stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{ width: "min-content", height: "min-content" }}
              />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart data={taskDistribution}>
              <Pie dataKey={"count"} data={projectStatus} fill="#82ca9d" label>
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ height: 300, width: "100%" }} className="">
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={taskLoading}
              getRowClassName={() => "data-grid-row"}
              getDetailPanelContent={() => "data-grid-cell"}
              className={dataGridClassName}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
