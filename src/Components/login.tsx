import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router";
import AuthStore from "../store/AuthStore.js";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import api from "../api/Dummyapi.js";
interface LoginFormValues {
  username: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();
  const isAuthentic = AuthStore((state) => state.isAuthentic);
  const setAccessToken = AuthStore((state) => state.setAccessToken);
  const setRefreshToken = AuthStore((state) => state.setRefreshToken);

  const setUser = AuthStore((state) => state.setUser);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const res = await api.post("/auth/login", values);
      const data = res.data;
      console.log("user data ", data);

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      setUser({
        id: data.id,
        username: data.username,
      });
    } catch (error) {
      alert("Invalid credentials ");
    }
  };

  useEffect(() => {
    if (isAuthentic) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthentic, navigate]);

  const validationSchema = Yup.object({
    username: Yup.string().required("Required Field"),
    password: Yup.string()
      .min(6, "must be atleast 6 characters")
      // .matches(/[@#.]/, "must contain @ or # or .")
      // .matches(/[0-9]/, "must contain atleast one number")
      .matches(/[a-z]/, "must contain atleast one alphabet")
      .required("Required Field"),
  });
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="flex flex-col justify-center bg-neutral-100 gap-3 rounded-2xl p-5 py-6 border border-gray-300 shadow-2xl w-80 lg:w-96 backdrop-blur-2xl">
            <h1 className="font-bold text-center text-3xl">Login</h1>
            <label>Username</label>
            <Field
              name="username"
              type="text"
              className="border border-gray-400 p-1 rounded"
            ></Field>
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 font-light"
            ></ErrorMessage>

            <label>Password</label>
            <Field
              name="password"
              type="password"
              className="border p-1 rounded border-gray-400"
            ></Field>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 font-light"
            ></ErrorMessage>

            <div className="flex flex-col gap-0.5">
              <button
                type="submit"
                className="bg-stone-200 rounded-xl text-gray-800 font-bold p-4 hover:bg-stone-300 transition duration-300 "
              >
                Submit
              </button>
              <div className="flex justify-between py-3">
                <p className="flex text-[15px] justify-center">
                  Don't have an account?{" "}
                </p>
                <Link
                  to="/signup"
                  className="text-[14px] underline hover:text-stone-600"
                >
                  SignUp
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Login;
