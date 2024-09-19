import deployVault_logo from "../../assets/logo_deployvault_inverted.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { FormikProvider, Field, ErrorMessage, FormikHelpers, useFormik } from "formik";
import useAuth from "../../auth/useAuth";
import { loginSchema, registerSchema } from "../../util/validationSchema";

type FormState = {
  email: string;
  password: string;
  username: string;
}

export const AuthForm = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { login, register } = useAuth();
  const initialState: FormState =
    pathname === "auth"
      ? { username: "", email: "", password: "" }
      : { username: "", email: "", password: "" };

  /**
   * Handles the form submission.
   *
   * @param values - The form values.
   * @param setSubmitting - A function to set the submitting state.
   */
  const handleSubmit = async (
    values: FormState,
    { setSubmitting }: FormikHelpers<FormState>,
  ) => {
    if (pathname === "/auth") {
      await login(values.email, values.password);
    } else {
      await register(values.username, values.email, values.password);
    }
    navigate("/home");
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: pathname === "/auth" ? loginSchema : registerSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex flex-col justify-center items-center pt-5 gap-4">
      <Link to="/">
        <img
          src={deployVault_logo}
          alt="CaOS Logo"
          className="mb-4"
          style={{ maxWidth: "500px" }}
        />
      </Link>
      <div className="p-10 w-[400px] border border-caos-gray-300 rounded-lg gap-3 flex flex-col">
        <h2 className="">{pathname === "/auth" ? "Sign in" : "Register"}</h2>
        <FormikProvider value={formik}>
          <Form className="w-full" onSubmit={formik.handleSubmit}>
            {pathname === "/register" && (
              <div className="form-group mb-3">
                <Field
                  name="username"
                  className={`form-control ${
                    formik.errors.username && formik.touched.username
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Username"
                  autoComplete="username" // Agrega este atributo
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            )}
            <div className="form-group mb-3">
              <Field
                name="email"
                className={`form-control ${
                  formik.errors.email && formik.touched.email
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Email"
                autoComplete="email" // Agrega este atributo
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group mb-3">
              <Field
                name="password"
                type="password"
                className={`form-control ${
                  formik.errors.password && formik.touched.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Password"
                autoComplete="current-password" // Agrega este atributo
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              {pathname === "/auth" ? "Sign in" : "Register"}
            </button>
          </Form>
          <div className="flex gap-3 items-center px-2">
            <div className="border-b border-b-caos-gray-200 flex-grow" />
            <span className="text-lg font-medium">or</span>
            <div className="border-b border-b-caos-gray-200 flex-grow" />
          </div>
          <div className="flex flex-col gap-2">
            <button className="w-full bg-zinc-200 text-black">
              <FaGoogle />
              {pathname === "/auth"
                ? "Sign in with Google"
                : "Register in with Google"}
            </button>
            <button className="w-full bg-black">
              <FaGithub />
              {pathname === "/auth"
                ? "Sign in with GitHub"
                : "Register in with GitHub"}
            </button>
          </div>
        </FormikProvider>
        <div className="border-b border-b-caos-gray-200" />
        <div className="text-center">
          <div className="text-center">
            {pathname === "/auth" ? (
              <p>
                New to CaOS?{" "}
                <Link to="/register" className="text-accent font-medium">
                  Create an account
                </Link>
              </p>
            ) : pathname === "/register" ? (
              <p>
                Already have an account?{" "}
                <Link to="/auth" className="text-accent font-medium">
                  Sign in
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
