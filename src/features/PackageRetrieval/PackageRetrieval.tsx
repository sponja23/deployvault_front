import React, { useEffect, useState } from "react";
import { ListGroup, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useGetSharedPackagesListMutation } from "../../redux/services/packageService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFirstFetch, selectGrantedPackages } from "../../redux/slices/packageSlice";
import { selectCurrentUser } from "../../redux/slices/userSlice";
import { selectIsLoading, setIsError } from "../../redux/slices/uiSlice";
import { RootState } from "../../redux/store";

const PackageRetrieval: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [getSharedPackages] = useGetSharedPackagesListMutation();
  const dispatch = useAppDispatch();
  const sharedPackages = useAppSelector(selectGrantedPackages);
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectIsLoading);
  const firstFetch = useAppSelector(selectFirstFetch);
  const isError = useAppSelector((state: RootState) => state.global.ui.isError);

  const handleCopy = (repo: string) => {
    navigator.clipboard.writeText(`pip install ${repo}`);
    setCopied(repo);
    setTimeout(() => setCopied(null), 3000); // Reset after 2 seconds
  };

  useEffect(() => {
    if (firstFetch && !isError) {
      getSharedPackages(currentUser!.username ?? "");
    }
  }, [firstFetch]);

  useEffect(() => {
    return () => {
      dispatch(setIsError(false));
    };
  }, [dispatch]);

  return (
    <div>
      <h2>Package Retrieval</h2>
      <ListGroup>
        {isLoading ? (
          <ListGroup.Item>Loading...</ListGroup.Item>
        ) : sharedPackages.length > 0 ? (
          sharedPackages.map((repo) => {
            console.log(repo);
            return (
              <ListGroup.Item key={repo.package_name}>
                <ListGroup.Item>
                  {repo.package_name}
                  <OverlayTrigger placement="right" overlay={<Tooltip>{copied === repo.package_name ? "Copied!" : "Copy"}</Tooltip>}>
                    <Button onClick={() => handleCopy(repo.package_name)} variant="secondary" className="ml-2">
                      {copied === repo.package_name ? "Copied!" : "Copy"}
                    </Button>
                  </OverlayTrigger>
                </ListGroup.Item>
              </ListGroup.Item>
            );
          })
        ) : (
          <ListGroup.Item>No shared packages found.</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default PackageRetrieval;
