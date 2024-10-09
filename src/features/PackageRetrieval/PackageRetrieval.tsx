import React, { useState } from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import useGrantedPackages, { GrantedPackage } from "./useGrantedPackages";

const PackageRetrieval: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [copied, setCopied] = useState<string | null>(null);

  const { packages, isLoading } = useGrantedPackages();

  const handleCopy = (repo: string) => {
    navigator.clipboard.writeText(`pip install ${repo}`);
    setCopied(repo);
    setTimeout(() => setCopied(null), 1500); // Reset after 1.5 seconds
  };

  return isLoading ? (
    <CaosSpinner />
  ) : (
    <div className="card">
      <DataTable
        loading={isLoading}
        value={packages}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage="No packages found."
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
      >
        <Column field="name" header="Name" sortable></Column>
        <Column
          field="public"
          header="Accessibility"
          body={(row: GrantedPackage) => (row.public ? "Public" : "Private")}
          sortable
        ></Column>
        <Column field="description" header="Description"></Column>
        <Column
          body={(row: GrantedPackage) => (
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip>{copied === row.name ? "Copied!" : "Copy"}</Tooltip>
              }
            >
              <Button
                onClick={() => handleCopy(row.name)}
                variant="secondary"
                className="ml-2"
                style={{ width: "75px" }}
              >
                {copied === row.name ? "Copied!" : "Copy"}
              </Button>
            </OverlayTrigger>
          )}
        ></Column>
      </DataTable>
    </div>
  );
};

export default PackageRetrieval;
