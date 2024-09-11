import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";
import "./Landing.css";
import useAuth from "../../auth/useAuth";

export const Landing: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="fade-in">
            <div className="full-width-container">
                <div className="inner-container landing-container">
                    <Row className="w-100">
                        <Col md={6} className="px-4 text-left">
                            <h1 className="display-4 mb-4">
                                Welcome to DeployVault
                            </h1>
                            <p className="lead mb-4">
                                Simplify your deployment process with
                                DeployVault. Our platform offers seamless
                                integration, powerful tools, and robust security
                                to streamline your development workflow.
                            </p>
                            <p className="mb-5">
                                Join thousands of developers who have already
                                transformed their deployment experience. Start
                                your journey with DeployVault today and take
                                your projects to new heights.
                            </p>
                            <div>
                                <CaOSButton
                                    label="Learn More"
                                    variant="primary"
                                    className="caos-button me-3"
                                />
                                <CaOSButton
                                    label={user ? "Dashboard" : "Join Us"}
                                    className="caos-button p-button-primary"
                                    onClick={() =>
                                        navigate(user ? "/home" : "/auth")
                                    }
                                />
                            </div>
                        </Col>
                        <Col
                            md={6}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <div className="landing-image-placeholder">
                                <p>Your image will go here</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className="full-width-container">
                <div className="inner-container features-container">
                    <Row className="w-100">
                        <Col
                            md={6}
                            className="px-4 text-left d-flex flex-column"
                        >
                            <span className="feature-label">Features</span>
                            <h2 className="feature-title">
                                Revolutionize Your Deployment Process
                            </h2>
                        </Col>
                        <Col md={6} className="px-4 text-left">
                            <p className="feature-description mb-4">
                                DeployVault offers a comprehensive suite of
                                tools designed to streamline your deployment
                                workflow, enhance collaboration, and boost
                                productivity.
                            </p>
                            <Row>
                                <Col md={6} className="feature-box">
                                    <h4>Automated Pipelines</h4>
                                    <p>
                                        Set up and manage complex deployment
                                        pipelines with ease, ensuring consistent
                                        and reliable releases.
                                    </p>
                                    <CaOSButton
                                        label="Explore Pipelines"
                                        variant="secondary"
                                        className="caos-button mt-2"
                                        onClick={() => navigate("/pipelines")}
                                    />
                                </Col>
                                <Col md={6} className="feature-box">
                                    <h4>Robust Security</h4>
                                    <p>
                                        Benefit from industry-leading security
                                        measures to protect your code and
                                        deployments at every step.
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
