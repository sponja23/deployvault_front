import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type Column<T> = {
  title: string;
  sort?: (a: T, b: T) => number;
};

export function Table<T extends object>({
  rows,
  columns,
  rowGenerator,
}: {
  rows: T[];
  columns: Column<T>[];
  rowGenerator: (item: T) => JSX.Element;
}) {
  const [orderBy, setOrderBy] = useState<{
    column: Column<T>;
    order: "asc" | "desc";
  } | null>(null);

  const sort = (column: Column<T>) => {
    if (!column.sort) return;

    if (
      orderBy &&
      orderBy.column.title === column.title &&
      orderBy.order === "asc"
    ) {
      setOrderBy({ column, order: "desc" });
    } else {
      setOrderBy({ column, order: "asc" });
    }
  };

  const [filter, setFilter] = useState("");

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex w-[400px] bg-primary-300 items-center gap-2 px-4 py-[10px] rounded-r-full">
        <input
          type="text"
          placeholder="Search your vault"
          className="bg-transparent w-full h-full px-0 border-none"
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="w-5 h-5">
          <FaSearch size={20} />
        </div>
      </div>
      <table className="w-full text-center font-light text-lg">
        <thead className="bg-primary-300">
          <tr className="h-14">
            {columns.map((column, i) => (
              <th key={i} className="p-0 border-0 select-none">
                <div
                  className={twMerge(
                    "px-5 py-3 font-medium inset-0",
                    column.sort &&
                      "cursor-pointer hover:bg-black/10 active:bg-black/20 flex gap-2 justify-center",
                  )}
                  onClick={() => column.sort && sort(column)}
                >
                  {column.title}
                  {column.sort && orderBy?.column.title !== column.title && (
                    <img src="/src/assets/sortable.svg" alt="" />
                  )}
                  {column.sort &&
                    orderBy?.column.title === column.title &&
                    orderBy.order === "asc" && (
                      <img src="/src/assets/sort_asc.svg" alt="" />
                    )}
                  {column.sort &&
                    orderBy?.column.title === column.title &&
                    orderBy.order === "desc" && (
                      <img src="/src/assets/sort_desc.svg" alt="" />
                    )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows
            .filter((row) =>
              Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(filter.toLowerCase()),
              ),
            )
            .sort((a, b) => {
              if (!orderBy || !orderBy.column.sort) return 0;
              return (
                orderBy.column.sort(a, b) * (orderBy.order === "asc" ? 1 : -1)
              );
            })
            .map((row) => rowGenerator(row))}
        </tbody>
      </table>
    </div>
  );
}
