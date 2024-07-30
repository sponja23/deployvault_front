import { Divider } from "primereact/divider";
import React from "react";
import { Container } from "react-bootstrap";
import { Menu } from "../../features/Ui/Menu";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/slices/uiSlice";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";

export const Home: React.FC = () => {
  //   const users = useSelector(selectCurrentPosts)
  const isLoading = useAppSelector(selectIsLoading);

  const content = isLoading ? <CaosSpinner /> : <Container>Lorem ipsum dolor sit amet consectetur adipisicing elit</Container>;
  return content;
};
