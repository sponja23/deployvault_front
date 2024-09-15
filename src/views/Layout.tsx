import { Outlet } from "react-router-dom";
import { Header } from "../features/Ui/Navbar";
import Footer from "../features/Ui/Footer";

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="min-h-screen pt-[75px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
