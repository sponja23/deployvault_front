import {
    DataTableExpandedRows,
    DataTableValueArray,
} from "primereact/datatable";
import { useState } from "react";
import usePackages from "../../packages/usePackages";

const usePackageRetrieval = () => {
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
