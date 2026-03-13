import ProjectTable from "./ProjectTable";
import {
  archiveProjects,
  plannedProjects,
  archiveColumns,
  plannedColumns,
} from "../data/projectData";

type TableType = "archive" | "planned";

interface ConfigurableProjectTableProps {
  type: TableType;
}

export default function ConfigurableProjectTable({ type }: ConfigurableProjectTableProps) {
  const config = {
    archive: { columns: archiveColumns, rows: archiveProjects },
    planned: { columns: plannedColumns, rows: plannedProjects },
  };

  const { columns, rows } = config[type];

  return <ProjectTable columns={columns} rows={rows} />;
}
