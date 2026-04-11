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
    archive: {
      columns: archiveColumns,
      rows: archiveProjects,
      caption: "Archived projects with build stack and links.",
    },
    planned: {
      columns: plannedColumns,
      rows: plannedProjects,
      caption: "Planned projects and their intended stack.",
    },
  };

  const { columns, rows, caption } = config[type];

  return <ProjectTable columns={columns} rows={rows} caption={caption} />;
}
