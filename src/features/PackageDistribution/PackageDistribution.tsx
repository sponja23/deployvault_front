import { useState } from "react";
import ShareRepoModal from "./ShareRepoModal";
import { formatDate } from "../../util/dateHelpers/dateHelpers";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";
import useUploadedPackages, { UploadedPackage } from "./useUploadedPackages";

export default function PackageDistribution() {
  const { grantAccess, revokeAccess, packages, isLoading } =
    useUploadedPackages();

  const [showShare, setShowShare] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<UploadedPackage | null>(null);

  const handleShare = (nameToShare: string) => {
    console.log(`Sharing with user: ${nameToShare}`);
    try {
      grantAccess(selectedPackage!.package_name, nameToShare);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleRevoke = (nameToRevoke: string) => {
    console.log(`Removing access for user: ${nameToRevoke}`);
    try {
      revokeAccess(selectedPackage!.package_name, nameToRevoke);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return isLoading ? (
    <CaosSpinner />
  ) : (
    <div className="w-full h-full flex justify-center px-20 py-20">
      <div className="w-full flex flex-col gap-5">
        <div className="flex w-[400px] bg-primary-300 items-center gap-2 px-4 py-[10px] rounded-r-full">
          <input
            type="text"
            placeholder="Search your vault"
            className="bg-transparent w-full h-full px-0 border-none"
          />
          <div className="w-5 h-5">
            <i className="pi pi-search" />
          </div>
        </div>
        <table className="w-full text-center font-light text-lg">
          <thead className="bg-primary-300">
            <tr className="h-14">
              <th className="font-medium">Name</th>
              <th className="font-medium">Description</th>
              <th className="font-medium">Upload Date</th>
              <th className="font-medium">Size</th>
              <th className="font-medium">Version</th>
              <th className="font-medium">Accessibility</th>
              <th className="font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {packages?.map((pkg) => (
              <tr
                key={pkg.package_id}
                className="h-16 even:bg-primary-evens odd:bg-primary-odds"
              >
                <td className="px-5 py-3">{pkg.package_name}</td>
                <td className="px-5 py-3 max-w-[550px]">
                  <div className="line-clamp-2">{pkg.description}</div>
                </td>
                <td className="px-5 py-3">{formatDate(pkg.created_at)}</td>
                <td className="px-5 py-3">{pkg.size}</td>
                <td className="px-5 py-3">v{pkg.version}</td>
                <td className="px-5 py-3">
                  {pkg.public ? "Public" : "Private"}
                </td>
                <td className="px-5 py-3">
                  <button
                    className="accent-button"
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setShowShare(true);
                    }}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ShareRepoModal
        show={showShare}
        onClose={() => setShowShare(false)}
        onShare={handleShare}
        onRevoke={handleRevoke}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}
