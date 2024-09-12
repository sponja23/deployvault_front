import React, { useState } from "react";
import ShareRepoModal from "./ShareRepoModal";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
} from "primereact/datatable";
import { formatDate } from "../../util/dateHelpers/dateHelpers";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";
import usePackages, { UploadedPackage } from "../../packages/usePackages";

/**
 * Represents the package distribution component.
 * @returns The package distribution component.
 */
const PackageDistribution: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  const {
    grantAccess,
    uploadedPackages: { data: uploadedPackages, isLoading: loading },
    revokeAccess,
  } = usePackages();

  const [showShare, setShowShare] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<UploadedPackage | null>(null);

  // TODO: Maybe move this
  const handleShare = (nameToShare: string) => {
    console.log(`Sharing with user: ${nameToShare}`);
    try {
      grantAccess(selectedPackage!.package_name, nameToShare);
      setShowShare(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleRemoveAccess = (package_name: string, nameToShare: string) => {
    console.log(`Removing access for user: ${nameToShare}`);
    try {
      revokeAccess(package_name, nameToShare);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const rowExpansionTemplate = (data: UploadedPackage) => {
    return (
      <div className="p-3">
        <DataTable value={data.shared_users}>
          <Column field="username" header="User Name" sortable></Column>
          <Column
            body={(user: { user_id: string; username: string }) => (
              <CaOSButton
                label={`Remove permissions`}
                onClick={() =>
                  handleRemoveAccess(data.package_name, user.username)
                } // Accessing the username property
              />
            )}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const content = loading ? (
    <CaosSpinner />
  ) : (
    <div className="card">
      <DataTable
        loading={loading}
        value={uploadedPackages}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage="No packages found."
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column
          expander={(rowData: UploadedPackage) =>
            rowData.shared_users !== undefined &&
            rowData.shared_users.filter((user) => user?.user_id).length > 0
          }
          style={{ width: "5rem" }}
        />
        <Column field="package_name" header="Name" sortable></Column>
        <Column field="size" header="Size" sortable></Column>
        <Column field="version" header="Version"></Column>
        <Column
          field="public"
          header="Accessibility"
          body={(row: UploadedPackage) => (row.public ? "Private" : "Private")}
          sortable
        ></Column>
        <Column
          field="created_at"
          header="Upload Date"
          body={(row: UploadedPackage) => formatDate(row.created_at)}
          sortable
        ></Column>
        <Column field="description" header="Description"></Column>
        <Column
          body={(pkg: UploadedPackage) => (
            <CaOSButton
              label="Share"
              onClick={() => {
                setSelectedPackage(pkg);
                setShowShare(true);
              }}
            />
          )}
        ></Column>
      </DataTable>
      <ShareRepoModal
        show={showShare}
        onHide={() => setShowShare(false)}
        onShare={handleShare}
        selectedPackage={selectedPackage}
      />
    </div>
  );

  return content;
};

export default PackageDistribution;
