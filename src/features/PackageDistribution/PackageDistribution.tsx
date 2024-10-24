import { useEffect, useState } from "react";
import ShareRepoModal from "./ShareRepoModal";
import LoadingSpinner from "../Ui/LoadingSpinner";
import useUploadedPackages, { UploadedPackage } from "./useUploadedPackages";
import { Table } from "./Table";

export default function PackageDistribution() {
  const { packages, isLoading } = useUploadedPackages();

  const [showShare, setShowShare] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<UploadedPackage | null>(null);

  const columns = [
    {
      title: "Name",
      sort: (a: UploadedPackage, b: UploadedPackage) =>
        a.name.localeCompare(b.name),
    },
    { title: "Description" },
    { title: "Accessibility" },
    { title: "" },
  ];

  useEffect(() => {
    if (selectedPackage && packages) {
      setSelectedPackage(
        packages!.find((p) => p.id === selectedPackage.id) || null,
      );
    }
  }, [packages]);

  const rowGenerator = (item: UploadedPackage) => (
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
          className="accent-button"
          onClick={() => {
            setSelectedPackage(item);
            setShowShare(true);
          }}
        >
          Manage
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
          <h1 className="text-2xl font-medium">No packages uploaded yet</h1>
          <p className="text-lg font-light">
            Upload a package to start sharing it
          </p>
        </div>
      ) : (
        <Table columns={columns} rows={packages} rowGenerator={rowGenerator} />
      )}
      <ShareRepoModal
        show={showShare}
        onClose={() => setShowShare(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}
