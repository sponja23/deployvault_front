import { OAuthSection } from "./OAuthSection";
import { ChangeAuthMethodMessage } from "./ChangeAuthMethodMessage";

export function AuthForm({
  title,
  authMethod,
}: {
  title: string;
  authMethod: "login" | "register";
}) {
  return (
    <div className="px-10 py-8 w-[400px] gap-5 flex flex-col bg-primary text-white">
      <h2>{title}</h2>
      <OAuthSection authMethod={authMethod} />
      <ChangeAuthMethodMessage authMethod={authMethod} />
    </div>
  );
}
