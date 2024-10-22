import { useState } from "react";
import LoadingSpinner from "../Ui/LoadingSpinner";
import useGrantedPackages, { GrantedPackage } from "./useGrantedPackages";
import { Table } from "../PackageDistribution/Table";

export default function PackageRetrieval() {
  const [copied, setCopied] = useState<string | null>(null);

  const { packages, isLoading } = useGrantedPackages();

  const handleCopy = (repo: string) => {
    navigator.clipboard.writeText(`pip install ${repo}`);
    setCopied(repo);
    setTimeout(() => setCopied(null), 1500); // Reset after 1.5 seconds
  };

  const columns = [
    {
      title: "Name",
      sort: (a: GrantedPackage, b: GrantedPackage) =>
        a.name.localeCompare(b.name),
    },
    { title: "Description" },
    { title: "Accessibility" },
    { title: "" },
  ];

  const rowGenerator = (item: GrantedPackage) => (
    <tr
      key={item.id}
      className="h-16 even:bg-primary-evens odd:bg-primary-odds"
    >
      <td className="px-5 py-3">{item.name}</td>
      <td className="px-5 py-3 max-w-[550px]">
        <div className="line-clamp-2">{item.description}</div>
      </td>
      <td className="px-5 py-3">{item.public ? "Public" : "Private"}</td>
      <td className="px-5 py-3">
        <button
          className="accent-button min-w-[100px]"
          onClick={() => {
            handleCopy(item.name);
          }}
        >
          {copied === item.name ? "Copied!" : "Copy"}
        </button>
      </td>
    </tr>
  );

  return isLoading ? (
    <div className="w-full flex flex-col gap-4 justify-center items-center p-20">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="w-full h-full flex justify-center px-20 py-20">
      {!packages || packages.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-medium">
            You don't have access to any package yet
          </h1>
        </div>
      ) : (
        <Table columns={columns} rows={packages} rowGenerator={rowGenerator} />
      )}
    </div>
  );
}
