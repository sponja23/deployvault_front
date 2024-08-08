import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSchema, registerSchema } from "../../util/validationSchema";
import { useLoginMutation, useSignupMutation } from "../../redux/services/authService";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/slices/uiSlice";

interface InitialState {
  email: string;
  password: string;
  username?: string;
}

/**
 * Custom hook for handling authentication form logic.
 *
 * @returns An object containing the Formik instance and the current pathname.
 */
export const useAuthForm = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [login] = useLoginMutation();
  const [register] = useSignupMutation();
  const isLoading = useAppSelector(selectIsLoading);
  const initialState: InitialState = pathname === "auth" ? { username: "", email: "", password: "" } : { username: "", email: "", password: "" };

  /**
   * Handles the form submission.
   *
   * @param values - The form values.
   * @param setSubmitting - A function to set the submitting state.
   */
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    if (pathname === "/auth") {
      await login({ email: values.email, password: values.password });
    } else {
      
      await register({username: values.username, email: values.email, password: values.password });
    }
    navigate("/home");
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: pathname === "/auth" ? loginSchema : registerSchema,
    onSubmit: handleSubmit,
  });
  return { formik, pathname, isLoading };
};
