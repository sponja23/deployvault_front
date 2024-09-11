import { FormikHelpers, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSchema, registerSchema } from "../../util/validationSchema";
import useAuth from "../../auth/useAuth";

interface FormState {
    email: string;
    password: string;
    username: string;
}

/**
 * Custom hook for handling authentication form logic.
 *
 * @returns An object containing the Formik instance and the current pathname.
 */
export const useAuthForm = () => {
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
        { setSubmitting }: FormikHelpers<FormState>
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
    return { formik, pathname };
};
