import { Outlet } from "react-router-dom";
import { Header } from "../features/Ui/Header";
import Footer from "../features/Ui/Footer";

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="min-h-screen pt-[75px] bg-primary-500 text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
