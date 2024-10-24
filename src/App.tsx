import { Home } from "./views/Home/Home";
import { Layout } from "./views/Layout";
import { Profile } from "./views/Profile/Profile";
import { AuthCallback } from "./auth/AuthCallback";
import Login from "./features/Authentication/Login";
import { RequireAuth } from "./features/Authentication/RequireAuth";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSettings from "./features/UserSettings/UserSettings";
import PackageRetrieval from "./features/PackageRetrieval/PackageRetrieval";
import PackageDistribution from "./features/PackageDistribution/PackageDistribution";
import Landing from "./views/Landing/Landing";
import Register from "./features/Authentication/Register";
import CliAuth from "./features/Authentication/CliAuth";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route index element={<Landing />} />
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/packages-retrieval"
                element={<PackageRetrieval />}
              />
              <Route
                path="/packages-distribution"
                element={<PackageDistribution />}
              />
              <Route path="/user-settings" element={<UserSettings />} />
              <Route path="/cli-auth" element={<CliAuth />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}
