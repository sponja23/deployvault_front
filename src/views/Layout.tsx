import { Outlet } from "react-router-dom";
import { NavBar } from "../features/Ui/Navbar";
import Footer from "../features/Ui/Footer";

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <NavBar />
      <main className="min-h-screen pt-36">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};
