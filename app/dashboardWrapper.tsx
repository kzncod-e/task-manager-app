"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode, useEffect } from "react";
import StoreProvider, { useAppSelector } from "./redux";
import AuthProvider from "./authProvider";
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  useEffect(() => {
    const className = "dark";
    const element = document.body;
    if (isDarkMode) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
    return () => {
      element.classList.remove(className);
    };
  }, [isDarkMode]);
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 ${isSidebarCollapsed ? "" : "md:pl-64"} dark:bg-dark-bg`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};
const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <AuthProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthProvider>
    </StoreProvider>
  );
};
export default DashboardWrapper;
