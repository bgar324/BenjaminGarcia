import { GitHubMarkIcon, WebsiteIcon } from "../../svgs/Icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type ProjectEntry = {
  year: number;
  title: string;
  builtWith: string[];
  websiteLink?: string;
  githubLink?: string;
  status?: string;
};

export type Column = {
  key: "year" | "title" | "builtWith" | "link" | "status";
  header: string;
  hiddenOn?: "md" | "lg";
};

export default function ProjectTable({
  columns,
  rows,
  caption,
}: {
  columns: Column[];
  rows: ProjectEntry[];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        {caption ? <TableCaption className="sr-only">{caption}</TableCaption> : null}
        <TableHeader>
          <TableRow className="border-b border-gray-200 dark:border-gray-800">
            {columns.map((c) => (
              <TableHead
                key={c.key}
                className={[
                  "text-sm font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider",
                  c.hiddenOn === "md" ? "hidden md:table-cell" : "",
                  c.hiddenOn === "lg" ? "hidden lg:table-cell" : "",
                  c.key === "year" ? "w-[100px]" : "",
                  c.key === "title" ? "min-w-[220px]" : "",
                  c.key === "builtWith" ? "min-w-[300px]" : "",
                  c.key === "link" ? "w-[120px]" : "",
                ].join(" ")}
              >
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={`${row.title}-${row.year}`}
              className="border-b border-gray-100 dark:border-gray-900 transition-colors duration-300"
            >
              {columns.map((c, i) => {
                const commonCellClasses = [
                  "text-base cursor-default",
                  c.hiddenOn === "md" ? "hidden md:table-cell" : "",
                  c.hiddenOn === "lg" ? "hidden lg:table-cell" : "",
                ].join(" ");

                if (c.key === "year") {
                  return (
                    <TableCell
                      key={i}
                      className={`whitespace-nowrap py-4 text-gray-700 dark:text-slate-300 font-medium ${commonCellClasses}`}
                    >
                      {row.year}
                    </TableCell>
                  );
                }

                if (c.key === "title") {
                  return (
                    <TableCell key={i} className={commonCellClasses}>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-slate-100">
                          {row.title}
                        </span>
                        {row.status === "In Progress" && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-slow-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                        )}
                      </div>
                    </TableCell>
                  );
                }

                if (c.key === "builtWith") {
                  return (
                    <TableCell key={i} className={commonCellClasses}>
                      <div className="flex flex-wrap gap-2">
                        {row.builtWith.map((t) => (
                          <span
                            key={t}
                            className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-slate-300 px-2.5 py-1 rounded-full text-xs font-medium cursor-default border border-gray-200 dark:border-gray-700 transition-colors duration-300 whitespace-nowrap"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  );
                }

                if (c.key === "link") {
                  return (
                    <TableCell
                      key={i}
                      className={`text-gray-900 dark:text-slate-100 whitespace-nowrap ${commonCellClasses}`}
                    >
                      {row.websiteLink || row.githubLink ? (
                        <div className="flex items-center gap-3">
                          {row.websiteLink && (
                            <a
                              href={row.websiteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors duration-300 flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                              title={`Visit ${row.title}`}
                              aria-label={`Visit ${row.title}`}
                            >
                              <WebsiteIcon />
                            </a>
                          )}
                          {row.githubLink && (
                            <a
                              href={row.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors duration-300 flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                              title={`View ${row.title} on GitHub`}
                              aria-label={`View ${row.title} on GitHub`}
                            >
                              <GitHubMarkIcon />
                            </a>
                          )}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  );
                }

                if (c.key === "status") {
                  return (
                    <TableCell
                      key={i}
                      className={`text-gray-700 dark:text-slate-300 ${commonCellClasses}`}
                    >
                      {row.status || "—"}
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={i} className={commonCellClasses}>
                    —
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
