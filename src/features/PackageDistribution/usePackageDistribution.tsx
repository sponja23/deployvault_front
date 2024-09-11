import { useEffect, useState } from "react";
import {
    useAddAccessPackageConfigMutation,
    useGetUploadedReposMutation,
} from "../../redux/services/packageService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    UploadedPackage,
    addSelectedPackage,
    removeSelectedPackage,
    selectCurrentSelectedPackage,
    selectCurrentUploadedPackages,
} from "../../redux/slices/packageSlice";
import {
    DataTable,
    DataTableExpandedRows,
    DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";
import { RootState } from "../../redux/store";
import { setIsError } from "../../redux/slices/uiSlice";
import useAuth from "../../auth/useAuth";

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
    const dispatch = useAppDispatch();
    const uploadedPackages = useAppSelector(selectCurrentUploadedPackages);
    const { user } = useAuth();
    const selectedRepo = useAppSelector(selectCurrentSelectedPackage);
    const isError = useAppSelector(
        (state: RootState) => state.global.ui.isError
    );
    const [getPackages] = useGetUploadedReposMutation();
    const [addAccessPackage] = useAddAccessPackageConfigMutation();
    const [showShare, setShowShare] = useState(false);
    const [email, setEmail] = useState("");

    const [expandedRows, setExpandedRows] = useState<
        DataTableExpandedRows | DataTableValueArray | undefined
    >(undefined);

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
            dispatch(removeSelectedPackage());
            const body = {
                package_name: package_name,
                user_name: nameToShare,
                grant_access: false,
            };
            addAccessPackage(body)
                .then((res: any) => {
                    console.log(res);
                    // getPackages(currentUser!.username ?? "");
                    if (res?.data.message == "Access revoked successfully.") {
                        getPackages(user!.username ?? "");
                    }
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
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

    const handleShowShare = (content: string | string[] | any) => {
        dispatch(addSelectedPackage(content));
        setShowShare(true);
    };

    const handleShare = (nameToShare: string) => {
        console.log(`Sharing with user: ${nameToShare}`);
        try {
            dispatch(removeSelectedPackage());
            const body = {
                package_name: selectedRepo!.package_name,
                user_name: nameToShare,
                grant_access: true,
            };
            addAccessPackage(body)
                .then((res: any) => {
                    if (res?.data.message == "Access granted successfully") {
                        getPackages(user!.username ?? "");
                        setShowShare(false);
                        setEmail("");
                    }
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    useEffect(() => {
        if (uploadedPackages.length === 0 && !isError) {
            getPackages(user!.username ?? "");
        }
    }, [getPackages]);

    useEffect(() => {
        return () => {
            dispatch(setIsError(false));
            // dispatch(clearUploadedPackages());
        };
    }, [dispatch]);

    return {
        uploadedPackages,
        showShare,
        handleCloseShare,
        handleShare,
        handleShowShare,
        handleRemoveAccess,
        email,
        setEmail,
        selectedRepo,
        rowExpansionTemplate,
        allowExpansion,
        expandedRows,
        setExpandedRows,
    };
};

export default usePackageDistribution;
