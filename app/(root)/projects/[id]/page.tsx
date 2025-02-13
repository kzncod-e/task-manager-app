"use client";
import React, { useEffect, useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";
type Props = { params: { id: string } };
const Projects = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTabs] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <div>
      {/* modal new Task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTabs} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Projects;
