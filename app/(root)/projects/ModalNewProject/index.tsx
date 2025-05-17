"use client";
import Modal from "@/components/Modal";
import { useCreateProjectMutation } from "@/state/api";
import { formatISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
type Props = {
  setIsSuccess?: (isSuccess: boolean) => void;
  setIsError?: (isError: boolean) => void;
  isSuccess?: boolean;
  isError?: boolean;
  isOpen: boolean;
  onClose: () => void;
};
const ModalNewProject = ({
  isOpen,
  onClose,
  isSuccess,
  isError,
  setIsError,
  setIsSuccess,
}: Props) => {
  //when you create an API slice using Redux Toolkit's createApi, it automatically generates hooks for your endpoints. These hooks include isLoading, isFetching, isSuccess, isError
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const resetForm = () => {
    setProjectName("");
    setStartDate("");
    setDescription("");
    setEndDate("");
  };

  const handleSubmit = async () => {
    if (!projectName || !startDate || !description || !endDate) return;
    const formattedStartDate = formatISO(new Date(startDate));
    const formattedEndDate = formatISO(new Date(endDate));

    try {
      await createProject({
        name: projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }).unwrap(); // important!

      if (setIsSuccess) setIsSuccess(true);
      resetForm(); // a helper to clear state
      onClose();
    } catch (err) {
      if (setIsError) setIsError(true);
    }
  };

  const isFormValid = () => {
    return projectName && startDate && description && endDate;
  };
  const inputStyle =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white focus:outline-none ";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          className={inputStyle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className={inputStyle}
          placeholder={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyle}
            placeholder={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyle}
            placeholder={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`rounded-mf mt-4 flex w-full justify-center border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating.." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
