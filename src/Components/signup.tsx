import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthStore from "../store/AuthStore.js";
import { Link } from "react-router";
import type { User } from "../Types/user.js";

import { useNavigate } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SignUpFormValues extends User {
  cpass: string;
}
function SignUp() {
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();
  const setUser = AuthStore((state) => state.setUser);

  const handleSignUp = (values: SignUpFormValues) => {
    const { cpass, ...userData } = values;
    const stored = JSON.parse(localStorage.getItem("users") || "[]");
    const users = Array.isArray(stored) ? stored : [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(userData);
    navigate("/dashboard", { replace: true });
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required("Required Field"),
    lname: Yup.string().required("Required Field"),
    email: Yup.string().email("Invalid email").required("Required Field"),
    password: Yup.string()
      .min(6, "must be atleast 6 characters")
      .matches(/[@#.]/, "must contain @ or # or .")
      .matches(/[0-9]/, "must contain atleast one number")
      .matches(/[a-z]/, "must contain atleast one alphabet")
      .required("Required Field"),
    cpass: Yup.string()
      .oneOf([Yup.ref("password")], "must be same as password")
      .required("Required Field"),
    dob: Yup.date().required("Required Field"),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "mobile number must be valid")
      .required("Required Field"),
    address: Yup.string().required("Required Field"),
  });
  return (
    <>
      <div className="flex items-center flex-col gap-10 justify-center bg-neutral-100/50 min-h-screen px-3">
        <div className="text-center space-y-2">
          <h1 className="text-2xl lg:text-4xl font-bold ">Create Your Account!</h1>
        </div>

        <Formik<SignUpFormValues>
          initialValues={{
            fname: "",
            lname: "",
            email: "",
            password: "",
            cpass: "",
            dob: "",
            mobile: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          <Form className="flex flex-col justify-center bg-white gap-3 rounded-2xl p-4 sm:p-6 w-[95%] sm:w-[85%] md:w-[70%] lg:w-125 border border-gray-300 shadow-2xl">
            <h1 className="font-bold text-center text-3xl p-3">Sign Up</h1>
            <div className="grid lg:grid-cols-2 sm:flex-row  gap-3">
              <div className="flex flex-col">
                <label>First Name</label>
                <Field
                  name="fname"
                  type="text"
                  className="border p-1 rounded border-gray-400 "
                ></Field>
                <ErrorMessage
                  name="fname"
                  component="div"
                  className="text-red-500 font-light "
                ></ErrorMessage>
              </div>

              <div className="flex flex-col ">
                <label>Last Name</label>
                <Field
                  name="lname"
                  type="text"
                  className="border p-1 rounded border-gray-400 "
                ></Field>
                <ErrorMessage
                  name="lname"
                  component="div"
                  className="text-red-500 font-light"
                ></ErrorMessage>
              </div>
            </div>

            <label>Email Id</label>
            <Field
              name="email"
              type="email"
              className="border p-1 rounded border-gray-400"
            ></Field>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 font-light"
            ></ErrorMessage>

            <div className=" gap-3 grid lg:grid-cols-2 sm:flex-row">
              <div className="flex flex-col relative">
                <label>Password</label>
                <Field
                  name="password"
                  type={showpassword ? "text" : "password"}
                  className="border p-1 rounded border-gray-400 "
                />

                <button
                  type="button"
                  onClick={() => setShowpassword(!showpassword)}
                  className="absolute right-3 top-8 text-gray-700
                   cursor-pointer"
                >
                  {showpassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 font-light"
                ></ErrorMessage>
              </div>

              <div className="flex flex-col">
                <label>Confirm Password</label>
                <Field
                  name="cpass"
                  type="password"
                  className="border p-1 rounded border-gray-400"
                ></Field>
                <ErrorMessage
                  name="cpass"
                  component="div"
                  className="text-red-500 font-light"
                ></ErrorMessage>
              </div>
            </div>

            <label>Date of Birth</label>
            <Field
              name="dob"
              type="date"
              className="border p-1 rounded border-gray-400"
            ></Field>
            <ErrorMessage
              name="dob"
              component="div"
              className="text-red-500 font-light"
            ></ErrorMessage>

            <label>Mobile No.</label>
            <Field
              name="mobile"
              type="number"
              className="border p-1 rounded border-gray-400"
            ></Field>
            <ErrorMessage
              name="mobile"
              component="div"
              className="text-red-500 font-light"
            ></ErrorMessage>

            <label>Address</label>
            <Field
              type="text"
              name="address"
              className="border p-1 rounded border-gray-400"
            ></Field>
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 font-light"
            ></ErrorMessage>

            <button
              type="submit"
              className="bg-stone-200 rounded-xl text-gray-800 font-bold p-4 hover:bg-stone-300 transition duration-300 "
            >
              Submit
            </button>
            <div className="flex justify-between">
              <p className="flex text-[15px] justify-center">
                Already have an account?{" "}
              </p>
              <Link
                to="/login"
                className="text-[15px] underline hover:text-stone-600"
              >
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default SignUp;
