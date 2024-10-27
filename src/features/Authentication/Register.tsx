import { AuthForm } from "./AuthForm";

export default function Register() {
  return (
    <div className="flex flex-col justify-center items-center pt-20 gap-4">
      <AuthForm title="Register" authMethod="register" />
    </div>
  );
}
