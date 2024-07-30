import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../features/Ui/Navbar";
import { Container } from "react-bootstrap";
import { useAppSelector } from "../redux/hooks";
import { Menu } from "../features/Ui/Menu";
import { CaosSpinner } from "../components/CaOSSpinner/CaosSpinner";
import { RootState } from "../redux/store";
import { selectIsLoading } from "../redux/slices/uiSlice";

export const Layout = () => {
  const [navHeight, setNavHeight] = useState(0);
  const { email } = useAppSelector((state: RootState) => state.global.user);
  const loading = useAppSelector(selectIsLoading);
  return (
    <Container>
      <NavBar onHeightChange={setNavHeight} />
      {loading ? (
        <Container style={{ paddingTop: navHeight }}>
          <CaosSpinner />
        </Container>
      ) : (
        <Container style={{ paddingTop: navHeight }}>
          {email ? <Menu /> : null}
          <Outlet />
        </Container>
      )}
    </Container>
  );
};
