"use client";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";
import { useGetTeamsQuery } from "@/state/api";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

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
  // field from the backend
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 150 },
  {
    field: "projectManagerUsername",
    headerName: "Project manager",
    width: 200,
  },
];
const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  console.log("teams", teams);

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;
  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div className="" style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          getRowId={(row) => row.id}
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

export default Teams;
