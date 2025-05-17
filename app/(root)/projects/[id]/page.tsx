"use client";
import React, { useEffect, useState } from "react";
import ProjectHeader from "../ProjectHeader";
import { ToastContainer, toast } from "react-toastify";
import Board from "../BoardView";
import List from "../ListView";
import Timeline from "../TimelineView";
import Table from "../Table";
import ModalNewTask from "@/components/ModalNewTask";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsTaskSuccess, setIsTaskError } from "@/state";
type Props = { params: { id: string } };
const Projects = ({ params }: Props) => {
  const dispatch = useAppDispatch();
  const { id } = params;
  const [activeTab, setActiveTabs] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  useEffect(() => {
    console.log(id);
  }, [id]);
  const isTaskSuccess = useAppSelector((state) => state.global.isTaskSuccess);
  const isTaskError = useAppSelector((state) => state.global.isTaskError);

  useEffect(() => {
    if (isTaskSuccess) {
      toast.success("Task created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      dispatch(setIsTaskSuccess(false));
    }
    if (isTaskError) {
      toast.error("Error creating task", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      dispatch(setIsTaskError(false));
    }
  }, [isTaskSuccess, isTaskError]);
  return (
    <div>
      {/* modal new Task */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      {/* header for active tab */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTabs} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Projects;
