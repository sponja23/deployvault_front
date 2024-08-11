import React from "react";
import { Card } from "primereact/card";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Col, Container, Image, Row } from "react-bootstrap";
import caosLogo from "../../assets/logo_deployvault_inverted.png";
import { selectCurrentUser } from "../../redux/slices/userSlice";

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { email } = useAppSelector(selectCurrentUser);

  return (
    <Container fluid className="d-flex flex-column align-items-center px-4">
      <Row className="w-100 justify-content-center mb-4 mt-4">
        <Col xs={12} className="text-center" style={{ maxWidth: "400px" }}>
          <Image src={caosLogo} alt="CaOS Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </Col>
      </Row>
      <Row className="w-100 justify-content-center">
        <Col lg={6} md={6} sm={12} className="mb-4">
          <Card title="Welcome to DeployVault" className="h-100 p-4 shadow border-round">
            <p className="lead mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet, odio at euismod bibendum, eros odio luctus dolor, vitae vehicula nisi nisi id massa. Fusce in sapien
              vel felis vehicula elementum.
            </p>
            <p>
              Aliquam erat volutpat. Vestibulum et lorem nec velit elementum volutpat. Ut consequat lorem eu libero posuere, a ultricies odio condimentum. Donec at libero a nulla vulputate
              malesuada.
            </p>
            <div className="mt-4 text-center">
              <CaOSButton label="Learn More" variant="primary" className="me-2" />
              {!email && <CaOSButton label="Sign In" className="p-button-primary" onClick={() => navigate("/auth")} />}
            </div>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} className="mb-4">
          <Card title="Features" className="h-100 p-4 shadow border-round">
            <p className="lead mb-4">
              Nullam sit amet justo et quam tempus condimentum. Morbi sit amet eros vestibulum, lacinia mi nec, iaculis ante.
            </p>
            <p>
              Nullam euismod, nunc quis ultricies tincidunt, odio ex mattis purus, nec vehicula nunc felis eu libero. Nulla facilisi. Donec nec nunc sit amet mi tincidunt aliquam.
            </p>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};
