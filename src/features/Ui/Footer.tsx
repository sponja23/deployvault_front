import { Link } from "react-router-dom";
import dvault_navbar from "../../assets/logo_deployvault.png";

export default function Footer() {
  return (
    <footer className="flex flex-col px-8 py-10 text-white bg-accent gap-10">
      <div className="flex flex-col gap-4">
        <img src={dvault_navbar} alt="Logo" className="h-6" />
        <div className="flex flex-col items-start">
          <h5>Address</h5>
          <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
        </div>
        <div className="flex flex-col items-start">
          <h5>Contact</h5>
          <ul className="underline">
            <li>1800 123 4567</li>
            <li>info@relume.io</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <div className="border h-[30px] w-[30px]" />
          <div className="border h-[30px] w-[30px]" />
          <div className="border h-[30px] w-[30px]" />
          <div className="border h-[30px] w-[30px]" />
          <div className="border h-[30px] w-[30px]" />
        </div>
      </div>
      <div className="border-t border-t-white flex justify-between pt-3">
        <span>© 2023 Relume. All rights reserved.</span>
        <div className="flex gap-2 items-center underline">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Cookies Settings</Link>
        </div>
      </div>
    </footer>
  );
}
