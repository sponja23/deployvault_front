import { AuthForm } from "./AuthForm";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center pt-20 gap-4">
      <AuthForm title="Sign In" authMethod="login" />
    </div>
  );
}
