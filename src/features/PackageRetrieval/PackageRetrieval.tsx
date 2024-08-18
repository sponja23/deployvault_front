import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { GrantedPackage } from "../../redux/slices/packageSlice";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";
import { DataTable } from "primereact/datatable";
import usePackageRetrieval from "./usePackageRetrieval";
import { Column } from "primereact/column";
import { formatDate } from "../../util/dateHelpers/dateHelpers";

const PackageRetrieval: React.FC = () => {
  const { expandedRows, setExpandedRows, loading, sharedPackages, copied, setCopied, handleCopy } = usePackageRetrieval();

  const content = false ? (
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
        <Column field="public" header="Accessibility" body={(row: GrantedPackage) => (row.version ? "Public" : "Private")} sortable></Column>
        <Column field="created_at" header="Upload Date" body={(row: GrantedPackage) => formatDate(row.created_at)} sortable></Column>
        <Column field="description" header="Description"></Column>
        <Column
          body={(row: GrantedPackage) => (
            <OverlayTrigger placement="right" overlay={<Tooltip>{copied === row.package_name ? "Copied!" : "Copy"}</Tooltip>}>
              <Button onClick={() => handleCopy(row.package_name)} variant="secondary" className="ml-2" style={{ width: "75px" }}>
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
