import "./App.css";
import { Home } from "./views/Home/Home";
import { Layout } from "./views/Layout";
import { Landing } from "./views/Landing/Landing";
import { Profile } from "./views/Profile/Profile";
import { AuthCallback } from "./auth/AuthCallback";
import { AuthForm } from "./features/Authentication/AuthForm";
import { RequireAuth } from "./features/Authentication/RequireAuth";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSettings from "./features/UserSettings/UserSettings";
import PackageRetrieval from "./features/PackageRetrieval/PackageRetrieval";
import PackageDistribution from "./features/PackageDistribution/PackageDistribution";

/**
 * The main component of the application.
 * Renders the application layout and sets up the routing.
 */
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/" element={<Layout />}>
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
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
