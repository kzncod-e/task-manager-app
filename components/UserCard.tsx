import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center rounded border p-4">
      {user.profilePictureUrl && (
        <Image
          src={`https://pm-s3-bucket1.s3.ap-southeast-2.amazonaws.com/p1.jpeg`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div className="">
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
