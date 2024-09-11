import React from "react";
import ShareRepoModal from "./ShareRepoModal";
import usePackageDistribution from "./usePackageDistribution";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { formatDate } from "../../util/dateHelpers/dateHelpers";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";
import { UploadedPackage } from "../../packages/usePackages";

/**
 * Represents the package distribution component.
 * @returns The package distribution component.
 */
const PackageDistribution: React.FC = () => {
    const {
        uploadedPackages,
        showShare,
        handleCloseShare,
        loading,
        handleShare,
        handleShowShare,
        email,
        setEmail,
        selectedPackage,
        rowExpansionTemplate,
        allowExpansion,
        expandedRows,
        setExpandedRows,
    } = usePackageDistribution();

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
                <Column expander={allowExpansion} style={{ width: "5rem" }} />
                <Column field="package_name" header="Name" sortable></Column>
                <Column field="size" header="Size" sortable></Column>
                <Column field="version" header="Version"></Column>
                <Column
                    field="public"
                    header="Accessibility"
                    body={(row: UploadedPackage) =>
                        row.public ? "Private" : "Private"
                    }
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
                    body={(row: UploadedPackage) => (
                        <CaOSButton
                            label="Share"
                            onClick={() => handleShowShare(row)}
                        />
                    )}
                ></Column>
            </DataTable>
            <ShareRepoModal
                show={showShare}
                onHide={handleCloseShare}
                onShare={handleShare}
                nameToShare={email}
                setTargetName={setEmail}
                selectedPackage={selectedPackage}
            />
        </div>
    );

    return content;
};

export default PackageDistribution;
