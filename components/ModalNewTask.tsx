import Modal from "@/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import { formatISO } from "date-fns";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};
const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  //when you create an API slice using Redux Toolkit's createApi, it automatically generates hooks for your endpoints. These hooks include isLoading, isFetching, isSuccess, isError
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.BackLog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");
  const handleSubmit = async () => {
    try {
      if (!title || !authorUserId || !(id !== null || projectId)) return;
      const formattedStartDate = formatISO(new Date(startDate), {
        representation: "complete",
      });
      const formattedEndDate = formatISO(new Date(dueDate), {
        representation: "complete",
      });

      const response = await createTask({
        title,
        description,
        status,
        priority,
        tags,
        projectId: id !== null ? Number(id) : Number(projectId),
        startDate: formattedStartDate,
        dueDate: formattedEndDate,
        authorUserId: parseInt(authorUserId),
        assignedUserId: parseInt(assignedUserId),
      });

      console.log("Task Created:", response);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const isFormValid = () => {
    return title && authorUserId;
  };
  const selectStyle =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  const inputStyle =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white focus:outline-none ";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyle}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyle}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>
          <select
            className={selectStyle}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Status</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.BackLog}>Completed</option>
          </select>
        </div>
        <input
          type="tags"
          className={inputStyle}
          placeholder="tags (Comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="date"
          className={inputStyle}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className={inputStyle}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="text"
          className={inputStyle}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyle}
          value={assignedUserId}
          placeholder="Assigned User ID"
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {id === null && (
          <input
            type="text"
            className={inputStyle}
            value={projectId}
            placeholder="Project ID"
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`rounded-mf mt-4 flex w-full justify-center border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating.." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
