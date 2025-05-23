"use client";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";
import { useGetUsersQuery } from "@/state/api";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import Image from "next/image";
import React, { ReactNode } from "react";
const CustomToolbar = (): ReactNode => {
  return (
    <GridToolbarContainer className="toolbar flex gap-3">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};
const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`https://pm-s3-bucket1.s3.ap-southeast-2.amazonaws.com/${params.value}`}
            alt={params.row.username}
            width={100}
            height={100}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];
const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error fetching users</div>;
  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div className="" style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassName}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;
