"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode, useEffect } from "react";
import StoreProvider, { useAppSelector } from "./redux";
import AuthProvider from "./authProvider";
import { useGetAuthUserQuery } from "@/state/api";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isTaskSuccess = useAppSelector((state) => state.global.isTaskSuccess);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: payload, isLoading } = useGetAuthUserQuery({});
  const { userDetails } = payload || {};

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

  // Check if userDetails is empty or undefined
  const isUserDetailsEmpty =
    !userDetails || Object.keys(userDetails).length === 0;

  if (isLoading || isUserDetailsEmpty) {
    // You can customize this loading placeholder as you want
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-700 dark:text-gray-300">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-dark-bg dark:text-gray-100">
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
