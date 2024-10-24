import { FormEvent, useEffect, useRef, useState } from "react";
import Modal from "../Ui/Modal";
import useUploadedPackages, { UploadedPackage } from "./useUploadedPackages";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../auth/useAuth";
import { twMerge } from "tailwind-merge";

type ShareRepoModalProps = {
  show: boolean;
  onClose: () => void;
  selectedPackage: UploadedPackage | null;
};

function ModalHeader({ packageName }: { packageName: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-3xl">
        Manage{" "}
        <b className="bg-accent px-3 py-1 font-bold ml-2 text-xl">
          {packageName}
        </b>
      </h2>
      <p className="font-thin text-lg">
        Grant or revoke access to this package
      </p>
    </div>
  );
}

function InviteForm({
  onShare,
  pending,
  error,
  success,
  reset,
}: {
  onShare: (username: string) => void;
  pending: boolean;
  error: Error | null;
  success: boolean;
  reset: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      onShare(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        reset();
      }, 1000);
    }
  }, [success, reset]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="search-input">Grant access to new users</label>
      <div className="flex gap-3">
        <div
          className={twMerge(
            "flex border border-white bg-transparent rounded-none px-4 py-3 cursor-text flex-grow items-center gap-3",
            error ? "border-red-500 border" : "",
          )}
          onClick={() => inputRef.current?.focus()}
        >
          <FaSearch size={20} />
          <input
            id="search-input"
            type="text"
            placeholder="Search users"
            className="text-lg bg-transparent border-none p-0 flex-grow"
            ref={inputRef}
            onAbort={reset}
          />
        </div>

        <button
          type="submit"
          className="accent-button w-[150px]"
          disabled={pending}
        >
          {pending ? "Granting..." : success ? "Granted!" : "Grant access"}
        </button>
      </div>
      <p className="text-red-500 text-sm h-[20px]">
        {error && <>An error occurred, make sure the user exists</>}
      </p>
    </form>
  );
}

function SharedUsers({
  sharedUsers,
  onRevoke,
  pending,
  error,
  success,
  reset,
}: {
  sharedUsers: { email: string; id: string }[];
  onRevoke: (username: string) => void;
  pending: boolean;
  error: Error | null;
  success: boolean;
  reset: () => void;
}) {
  const [userToRevoke, setUserToRevoke] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        reset();
      }, 1000);

      setUserToRevoke(null);
    }
  }, [success, reset]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base font-normal">Users with access</h3>
      {sharedUsers.length === 0 && (
        <p className="text-center w-full text-caos-gray-300 text-lg py-6">
          No users have access to this package yet.
        </p>
      )}
      {sharedUsers.length > 0 && (
        <ul>
          {sharedUsers.map((user) => (
            <li className="flex flex-col px-3 py-2" key={user.id}>
              <div className="flex justify-between">
                <span className="flex items-center">{user.email}</span>
                <button
                  onClick={() => {
                    setUserToRevoke(user.id);
                    onRevoke(user.email);
                  }}
                >
                  {pending && userToRevoke === user.id
                    ? "Revoking..."
                    : success && userToRevoke === user.id
                      ? "Revoked!"
                      : "Revoke access"}
                </button>
              </div>
              {error && userToRevoke === user.id && (
                <p className="text-red-500 text-sm h-[20px]">
                  An error occurred, please try again
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ShareRepoModal({
  show,
  onClose,
  selectedPackage,
}: ShareRepoModalProps) {
  const { user } = useAuth();
  const {
    grantAccess,
    revokeAccess,
    grantPending,
    grantError,
    grantSuccess,
    grantReset,
    revokePending,
    revokeError,
    revokeSuccess,
    revokeReset,
  } = useUploadedPackages();

  if (!selectedPackage) return null;

  const onShare = (username: string) => {
    grantAccess(selectedPackage.name, username);
  };

  const onRevoke = (username: string) => {
    revokeAccess(selectedPackage.name, username);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      className="max-w-[500px] max-h-[700px]"
    >
      <div className="text-white">
        <div className="flex flex-col gap-10">
          <ModalHeader packageName={selectedPackage.name} />
          <InviteForm
            onShare={onShare}
            pending={grantPending}
            error={grantError}
            success={grantSuccess}
            reset={grantReset}
          />
          <SharedUsers
            sharedUsers={selectedPackage.package_accesses!.filter(
              (a) => a.email !== user?.email,
            )}
            onRevoke={onRevoke}
            pending={revokePending}
            error={revokeError}
            success={revokeSuccess}
            reset={revokeReset}
          />
        </div>
      </div>
    </Modal>
  );
}
