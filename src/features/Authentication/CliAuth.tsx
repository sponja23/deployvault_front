import { FormEventHandler } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiMutation } from "../../api/apiQueries";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Ui/LoadingSpinner";

const permittedKeys = [
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  "Enter",
];

export default function CliAuth() {
  const [searchParams] = useSearchParams();
  const deviceCode = searchParams.get("device_code");

  const {
    mutate: sendCode,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (body: { device_code: string; user_code: string }) => {
      return apiMutation<
        {
          device_code: string;
          user_code: string;
        },
        { message: string }
      >("/auth/cli/authorize", body);
    },
  });

  if (!deviceCode) {
    return (
      <div className="flex items-center justify-center p-20 flex-col gap-5">
        <h2>No device code provided</h2>
        <p className="text-lg">
          We recommend you follow the link directly from the CLI
        </p>
        <Link to="/">
          <button className="accent-button">Go back to the home page</button>
        </Link>
      </div>
    );
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const code = e.currentTarget.code.value;
    if (code.length !== 6) {
      alert("Please enter a 6-character code");
      return;
    }

    try {
      sendCode({ device_code: deviceCode, user_code: code });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-20 flex-col gap-5">
      {isPending && (
        <>
          <LoadingSpinner />
          <p>Waiting for the code to be verified</p>
        </>
      )}
      {isSuccess && (
        <>
          <h2>You are successfully logged in</h2>
          <p>You can now close this window and return to the CLI</p>
          <Link to="/">
            <button className="accent-button">Go back to the home page</button>
          </Link>
        </>
      )}
      {!isPending && !isSuccess && (
        <>
          <h2>You are logging in to DeployVault from the CLI tool</h2>
          <h3>Please enter your 6-character code</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="bg-transparent border uppercase text-2xl"
              type="text"
              name="code"
              max={6}
              min={6}
              onKeyDown={(e) => {
                if (permittedKeys.includes(e.key)) return;

                const value = e.currentTarget.value;

                if (value.length === 6) e.preventDefault();
              }}
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData("text/plain");

                if (text.length !== 6) return;

                e.currentTarget.value = text;
              }}
            />
            <button className="accent-button">Submit</button>
          </form>
          {error && (
            <p className="text-red-500">
              Make sure you entered the code correctly
            </p>
          )}
        </>
      )}
    </div>
  );
}
