import { FormEvent, useRef } from "react";
import Modal from "../Ui/Modal";
import { UploadedPackage } from "./useUploadedPackages";
import { FaSearch } from "react-icons/fa";

type ShareRepoModalProps = {
  show: boolean;
  onClose: () => void;
  onShare: (username: string) => void;
  onRevoke: (username: string) => void;
  selectedPackage: UploadedPackage | null;
};

function ModalHeader() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-3xl">Share your package</h2>
      <p className="font-thin text-lg">
        Give access to one of your team members or revoke their access.
      </p>
    </div>
  );
}

function InviteForm({ onShare }: { onShare: (username: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      onShare(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="search-input">Grant access to new users</label>
      <div className="flex gap-3">
        <div
          className="flex border border-white bg-transparent rounded-none px-4 py-3 cursor-text flex-grow items-center gap-3"
          onClick={() => inputRef.current?.focus()}
        >
          <FaSearch size={20} />
          <input
            id="search-input"
            type="text"
            placeholder="Search users"
            className="text-lg bg-transparent border-none p-0 flex-grow"
            ref={inputRef}
          />
        </div>
        <button type="submit" className="accent-button w-[150px]">
          Grant access
        </button>
      </div>
    </form>
  );
}

function SharedUsers({
  sharedUsers,
  onRevoke,
}: {
  sharedUsers: { email: string; id: string }[];
  onRevoke: (username: string) => void;
}) {
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
            <li className="px-3 py-2 flex justify-between" key={user.id}>
              <span>{user.email}</span>
              <button onClick={() => onRevoke(user.email)}>
                Revoke access
              </button>
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
  onShare,
  onRevoke,
  selectedPackage,
}: ShareRepoModalProps) {
  if (!selectedPackage) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      className="max-w-[500px] max-h-[700px]"
    >
      <div className="text-white">
        <div className="flex flex-col gap-10">
          <ModalHeader />
          <InviteForm onShare={onShare} />
          <SharedUsers
            sharedUsers={selectedPackage.shared_users!}
            onRevoke={onRevoke}
          />
        </div>
      </div>
    </Modal>
  );
}
