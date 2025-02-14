import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}
export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
}
export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: string;
}

export interface Attachment {
  id?: number;
  fileUrl: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: Status;
  priority?: Priority;
  tags: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId?: number;
  authorUserId?: string;
  assignedUserId?: string;
  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments: Attachment[];
}
// from redux to create http request
// grab the api request of projects
// the name doenst need same as the backend fucntion
//this will give you updated data of project
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"], // This specifies that the 'getProjects' query provides the 'Projects' tag
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"], // This invalidates the 'Projects' tag, causing any queries with this tag to re-fetch
    }),
    getTask: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        //When a task is updated, RTK Query can ensure only the data for that specific task is re-fetched, not the entire task list.
        //is creating a tag object that RTK Query uses for caching, invalidation, and re-fetching purposes.
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }], // This specifies that the 'getTask' query provides tags for each task's project
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ], // This invalidates the 'Projects' tag, causing any queries with this tag to re-fetch
    }),
  }),
});

// Export hooks
export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = api;
