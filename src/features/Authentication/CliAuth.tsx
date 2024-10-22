import { FormEventHandler } from "react";
import { useSearchParams } from "react-router-dom";
import { apiMutation } from "../../api/apiQueries";

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

  if (!deviceCode) {
    return <h2>Invalid device code</h2>;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const code = e.currentTarget.code.value;
    if (code.length !== 6) {
      alert("Please enter a 6-character code");
      return;
    }

    // TODO: Implement the logic to send the 6-character code with the device code to the backend

    try {
      await apiMutation(`/auth/cli/authorize/`, {
        device_code: deviceCode,
        user_code: code,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>You are logging in to DeployVault from the CLI tool</h2>
      <h3>Please enter your 6-character code</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-transparent border uppercase w-[90px]"
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
    </div>
  );
}
