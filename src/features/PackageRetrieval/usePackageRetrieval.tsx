import { DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { useEffect, useState } from "react";
import { clearGrantedPackages, selectGrantedPackages } from "../../redux/slices/packageSlice";
import { useGetSharedPackagesListMutation } from "../../redux/services/packageService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/userSlice";
import { selectIsLoading, setIsError } from "../../redux/slices/uiSlice";
import { RootState } from "../../redux/store";

const usePackageRetrieval = () => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state: RootState) => state.global.ui.isError); // TODO CHECK THIS STATE
  const sharedPackages = useAppSelector(selectGrantedPackages);
  const currentUser = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectIsLoading);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
  const [copied, setCopied] = useState<string | null>(null);
  const [getSharedPackages] = useGetSharedPackagesListMutation();
  const [firstCall, setFirstCall] = useState(true);

  const handleCopy = (repo: string) => {
    navigator.clipboard.writeText(`pip install ${repo}`);
    setCopied(repo);
    setTimeout(() => setCopied(null), 3000); // Reset after 2 seconds
  };
  useEffect(() => {
    if (sharedPackages.length === 0 && firstCall) {
      setFirstCall(false);
      getSharedPackages(currentUser!.username ?? "");
    }
  }, [getSharedPackages]);

  useEffect(() => {
    return () => {
      dispatch(setIsError(false));
      dispatch(clearGrantedPackages());
      setFirstCall(false);
    };
  }, [dispatch]);

  // const allowExpansion = (rowData: GrantedPackage) => {
  //     const rowDataFiltered = rowData?.shared_users?.filter((user) => user?.user_id);
  //     return rowDataFiltered!.length > 0;
  //   };
  return { expandedRows, setExpandedRows, loading, sharedPackages, copied, setCopied, handleCopy };
};

export default usePackageRetrieval;
