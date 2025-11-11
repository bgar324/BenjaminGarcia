"use client";

import ProjectTable from "./ProjectTable";
import {
  archiveProjects,
  plannedProjects,
  scrappedProjects,
  archiveColumns,
  plannedColumns,
  scrappedColumns,
} from "../data/projectData";

type TableType = "archive" | "planned" | "scrapped";

interface ConfigurableProjectTableProps {
  type: TableType;
}

export default function ConfigurableProjectTable({ type }: ConfigurableProjectTableProps) {
  const config = {
    archive: { columns: archiveColumns, rows: archiveProjects },
    planned: { columns: plannedColumns, rows: plannedProjects },
    scrapped: { columns: scrappedColumns, rows: scrappedProjects },
  };

  const { columns, rows } = config[type];

  return <ProjectTable columns={columns} rows={rows} />;
}
