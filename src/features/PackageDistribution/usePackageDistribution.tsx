import { useState } from "react";
import {
    DataTable,
    DataTableExpandedRows,
    DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";
import usePackages, { UploadedPackage } from "../../packages/usePackages";

/**
 * Custom hook for managing package distribution.
 *
 * @returns An object containing the following properties and functions:
 *   - uploadedPackages: An array of uploaded packages.
 *   - show: A boolean indicating whether to show the package distribution modal.
 *   - handleClose: A function to close the package distribution modal.
 *   - handleShare: A function to share a repository with a specified email.
 *   - handleShow: A function to show the package distribution modal for a specific repository.
 *   - message: A string representing the success message after sharing a repository.
 *   - email: A string representing the email to share the repository with.
 *   - setEmail: A function to set the email for sharing the repository.
 */
const usePackageDistribution = () => {
    const [showShare, setShowShare] = useState(false);
    const [email, setEmail] = useState("");
    const [selectedPackage, setSelectedPackage] =
        useState<UploadedPackage | null>(null);

    const [expandedRows, setExpandedRows] = useState<
        DataTableExpandedRows | DataTableValueArray | undefined
    >(undefined);

    const {
        uploadedPackages: { data: uploadedPackages, isLoading: loading },
        grantAccess,
        revokeAccess,
    } = usePackages();

    const rowExpansionTemplate = (data: UploadedPackage) => {
        return (
            <div className="p-3">
                <DataTable value={data.shared_users}>
                    <Column
                        field="username"
                        header="User Name"
                        sortable
                    ></Column>
                    <Column
                        body={(user: { user_id: string; username: string }) => (
                            <CaOSButton
                                label={`Remove permissions`}
                                onClick={() =>
                                    handleRemoveAccess(
                                        data.package_name,
                                        user.username
                                    )
                                } // Accessing the username property
                            />
                        )}
                    ></Column>
                </DataTable>
            </div>
        );
    };

    const handleRemoveAccess = (package_name: string, nameToShare: string) => {
        console.log(`Removing access for user: ${nameToShare}`);
        try {
            revokeAccess(package_name, nameToShare);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    const allowExpansion = (rowData: UploadedPackage) => {
        const rowDataFiltered = rowData?.shared_users?.filter(
            (user) => user?.user_id
        );
        return rowDataFiltered!.length > 0;
    };

    const handleCloseShare = () => setShowShare(false);

    const handleShowShare = (pkg: UploadedPackage) => {
        setSelectedPackage(pkg);
        setShowShare(true);
    };

    const handleShare = (nameToShare: string) => {
        console.log(`Sharing with user: ${nameToShare}`);
        try {
            grantAccess(selectedPackage!.package_name, nameToShare);
            setShowShare(false);
            setEmail("");
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return {
        uploadedPackages,
        showShare,
        handleCloseShare,
        handleShare,
        handleShowShare,
        handleRemoveAccess,
        email,
        setEmail,
        selectedPackage,
        rowExpansionTemplate,
        allowExpansion,
        expandedRows,
        setExpandedRows,
        loading,
    };
};

export default usePackageDistribution;
