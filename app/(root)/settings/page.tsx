"use client";
import Header from "@/components/Header";
import { useGetAuthUserQuery } from "@/state/api";
import React from "react";
import Image from "next/image";
const Settings = () => {
  const { data: currentUser } = useGetAuthUserQuery({});

  console.log(currentUser);

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white ";
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label htmlFor="" className={labelStyles}>
            Username
          </label>
          <div className={textStyles}>
            {" "}
            {currentUser && currentUser?.userDetails?.username}
          </div>
        </div>
        <div>
          <label htmlFor="" className={labelStyles}>
            Profile picture
          </label>
          <div>
            <Image
              width={100}
              height={100}
              src={`https://pm-s3-bucket1.s3.ap-southeast-2.amazonaws.com/${currentUser?.userDetails?.profilePictureUrl}`}
              alt="Profile"
              className="mt-4 h-16 w-16 rounded-full"
            />
          </div>
        </div>
        <div>
          <label htmlFor="" className={labelStyles}>
            Team
          </label>
          <div className={textStyles}>
            Team {currentUser && currentUser?.userDetails?.teamId}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Settings;
