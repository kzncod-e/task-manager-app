import React from "react";
import ReusablePriorityPage from "../reusablePrioirtyPage";
import { Priority } from "@/state/api";

const BackLog = () => {
  return <ReusablePriorityPage priority={Priority.BackLog} />;
};

export default BackLog;
