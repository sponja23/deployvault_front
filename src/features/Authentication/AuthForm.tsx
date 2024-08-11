import React from "react";
import deployVault_logo from "../../assets/logo_deployvault_inverted.png";
import { Link } from "react-router-dom";
import { Divider } from "primereact/divider";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";
import { useAuthForm } from "./useAuthForm";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Container, Form, Card, Image } from "react-bootstrap";
import { FormikProvider, Field, ErrorMessage } from "formik";

export const AuthForm = () => {
  const { formik, pathname, isLoading } = useAuthForm();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center px-4">
      <Link to="/">
        <Image src={deployVault_logo} alt="CaOS Logo" className="mb-4" style={{ maxWidth: "500px" }} />
      </Link>
      <Card className="p-4" style={{ width: "400px", minHeight: "400px", overflow: "hidden" }}>
        {isLoading ? (
          <CaosSpinner />
        ) : (
          <Card.Body>
            <h1 className="text-center mb-4">{pathname === "/auth" ? "Sign in" : "Register"}</h1>
            <FormikProvider value={formik}>
              <Form className="w-100" onSubmit={formik.handleSubmit}>
                {pathname === "/register" && (
                  <Container className="form-group mb-3">
                    <Field
                      name="username"
                      className={`form-control ${formik.errors.username && formik.touched.username ? "is-invalid" : ""}`}
                      placeholder="Username"
                      autoComplete="username" // Agrega este atributo
                    />
                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                  </Container>
                )}
                <Container className="form-group mb-3">
                  <Field
                    name="email"
                    className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
                    placeholder="Email"
                    autoComplete="email" // Agrega este atributo
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </Container>
                <Container className="form-group mb-3">
                  <Field
                    name="password"
                    type="password"
                    className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
                    placeholder="Password"
                    autoComplete="current-password" // Agrega este atributo
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </Container>
                <CaOSButton
                  label={pathname === "/auth" ? "Sign in" : "Register"}
                  buttonType="submit"
                  variant="outline-dark"
                  className="w-100 mb-2 d-flex align-items-center justify-content-center"
                  disabled={formik.isSubmitting}
                />
              </Form>
              <Divider>or</Divider>
              <CaOSButton
                label={
                  <>
                    <FaGoogle className="me-2" /> {pathname === "/auth" ? "Sign in with Google" : "Register in with Google"}
                  </>
                }
                type="secondary"
                variant="outline-dark"
                className="w-100 mb-2 d-flex align-items-center justify-content-center"
              />

              <CaOSButton
                type="secondary"
                label={
                  <>
                    <FaGithub className="me-2" /> {pathname === "/auth" ? "Sign in with GitHub" : "Register in with GitHub"}
                  </>
                }
                variant="outline-dark"
                className="w-100 d-flex align-items-center justify-content-center"
              />
            </FormikProvider>
          </Card.Body>
        )}
        <>
          {!isLoading && (
            <Card.Footer className="text-center">
              <Container className="text-center">
                {pathname === "/auth" ? (
                  <p className="mb-0">
                    New to CaOS? <Link to="/register">Create an account</Link>
                  </p>
                ) : pathname === "/register" ? (
                  <p className="mb-0">
                    Already have an account? <Link to="/auth">Sign in</Link>
                  </p>
                ) : null}
              </Container>
            </Card.Footer>
          )}
        </>
      </Card>
    </Container>
  );
};
