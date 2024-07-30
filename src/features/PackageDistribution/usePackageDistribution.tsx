import React, { useEffect, useState } from "react";
import { useAddAccessPackageConfigMutation, useGetUploadedReposMutation } from "../../redux/services/packageService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UploadedPackage, addSelectedPackage, removeSelectedPackage, selectCurrentSelectedPackage, selectCurrentUploadedPackages } from "../../redux/slices/packageSlice";
import { selectCurrentUser } from "../../redux/slices/userSlice";
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { Column } from "primereact/column";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";
import { RootState } from "../../redux/store";
import { setIsError } from "../../redux/slices/uiSlice";

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
  const currentUser = useAppSelector(selectCurrentUser);
  const selectedRepo = useAppSelector(selectCurrentSelectedPackage);
  const isError = useAppSelector((state: RootState) => state.global.ui.isError);
  const [getPackages] = useGetUploadedReposMutation();
  const [addAccessPackage] = useAddAccessPackageConfigMutation();
  const [showShare, setShowShare] = useState(false);
  const [email, setEmail] = useState("");

  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

  const rowExpansionTemplate = (data: UploadedPackage) => {
    return (
      <div className="p-3">
        <DataTable value={data.shared_users}>
          <Column field="user_id" header="user_id" sortable></Column>
          <Column
            body={(row: UploadedPackage) => (
              <CaOSButton
                label={`Remove permissions`}
                //TODO(Mariano): Create and implements function to remove permissions
                //  onClick={() => handleShowShare(row)}
              />
            )}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const allowExpansion = (rowData: UploadedPackage) => {
    const rowDataFiltered = rowData?.shared_users?.filter((user) => user?.user_id);
    return rowDataFiltered!.length > 0;
  };

  const handleCloseShare = () => setShowShare(false);

  const handleShowShare = (content: string | string[] | any) => {
    dispatch(addSelectedPackage(content));
    setShowShare(true);
  };

  const handleShare = (email: string) => {
    try {
      dispatch(removeSelectedPackage());
      const body = { package_name: selectedRepo!.package_name, user_name: email, grant_access: true };
      addAccessPackage(body)
        .then((res: any) => {
          if (res?.data.message == "Access granted successfully") {
            getPackages(currentUser.email?.split("@")[0] ?? "");
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
      getPackages(currentUser.email?.split("@")[0] ?? "");
    }
  }, [getPackages]);

  useEffect(() => {
    return () => {
      dispatch(setIsError(false));
    };
  }, [dispatch]);

  return {
    uploadedPackages,
    showShare,
    handleCloseShare,
    handleShare,
    handleShowShare,
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
