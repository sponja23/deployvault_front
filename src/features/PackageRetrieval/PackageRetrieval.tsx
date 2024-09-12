import React, { useState } from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { formatDate } from "../../util/dateHelpers/dateHelpers";
import usePackages, { GrantedPackage } from "../../packages/usePackages";

const PackageRetrieval: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [copied, setCopied] = useState<string | null>(null);

  const {
    grantedPackages: { data: sharedPackages, isLoading: loading },
  } = usePackages();

  const handleCopy = (repo: string) => {
    navigator.clipboard.writeText(`pip install ${repo}`);
    setCopied(repo);
    setTimeout(() => setCopied(null), 1500); // Reset after 1.5 seconds
  };

  const content = loading ? (
    <CaosSpinner />
  ) : (
    <div className="card">
      <DataTable
        loading={loading}
        value={sharedPackages}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage="No packages found."
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
      >
        <Column field="package_name" header="Name" sortable></Column>
        <Column field="size" header="Size" sortable></Column>
        <Column field="version" header="Version"></Column>
        <Column
          field="public"
          header="Accessibility"
          body={(row: GrantedPackage) => (row.public ? "Public" : "Private")}
          sortable
        ></Column>
        <Column
          field="created_at"
          header="Upload Date"
          body={(row: GrantedPackage) => formatDate(row.created_at)}
          sortable
        ></Column>
        <Column field="description" header="Description"></Column>
        <Column
          body={(row: GrantedPackage) => (
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip>
                  {copied === row.package_name ? "Copied!" : "Copy"}
                </Tooltip>
              }
            >
              <Button
                onClick={() => handleCopy(row.package_name)}
                variant="secondary"
                className="ml-2"
                style={{ width: "75px" }}
              >
                {copied === row.package_name ? "Copied!" : "Copy"}
              </Button>
            </OverlayTrigger>
          )}
        ></Column>
      </DataTable>
    </div>
  );

  return content;
};

export default PackageRetrieval;
