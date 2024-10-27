import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export function HeroSection() {
  const { user } = useAuth();
  return (
    <section className="flex flex-col gap-10 bg-primary text-white min-h-[650px] bg-hero bg-no-repeat bg-right">
      <div className="flex flex-col justify-start w-fit">
        <h2 className="text-8xl">Welcome to</h2>
        <h2 className="text-8xl">DeployVault</h2>
      </div>
      <p className="font-extralight max-w-[500px]">
        A commercially-friendly alternative to open-source distribution,
        simplifying the process of selling and distributing proprietary software
        for small businesses and independent developers.
      </p>
      <div className="flex gap-3">
        <button className="border-button">Learn More</button>
        <Link to={user ? "/home" : "/auth"}>
          <button className="accent-button">
            {user ? "Dashboard" : "Join Us"}
          </button>
        </Link>
      </div>
    </section>
  );
}
