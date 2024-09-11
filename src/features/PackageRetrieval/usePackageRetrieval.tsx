import {
    DataTableExpandedRows,
    DataTableValueArray,
} from "primereact/datatable";
import { useState } from "react";
import {  useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/slices/uiSlice";
import usePackages from "../../packages/usePackages";

const usePackageRetrieval = () => {
    const loading = useAppSelector(selectIsLoading);
    const [expandedRows, setExpandedRows] = useState<
        DataTableExpandedRows | DataTableValueArray | undefined
    >(undefined);
    const [copied, setCopied] = useState<string | null>(null);

    const {
        grantedPackages: { data: sharedPackages },
    } = usePackages();

    const handleCopy = (repo: string) => {
        navigator.clipboard.writeText(`pip install ${repo}`);
        setCopied(repo);
        setTimeout(() => setCopied(null), 3000); // Reset after 2 seconds
    };
    
    return {
        expandedRows,
        setExpandedRows,
        loading,
        sharedPackages,
        copied,
        setCopied,
        handleCopy,
    };
};

export default usePackageRetrieval;
