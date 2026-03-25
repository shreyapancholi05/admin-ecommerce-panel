import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthStore from "../../store/AuthStore.js";
interface ChangePassValues {
  password: string
  newpassword: string
  cpassword: string
}
function ChangePass() {
  const setUser = AuthStore((state) => state.setUser);

  const handleChange = (values: ChangePassValues) => {
    const { password, newpassword } = values;
    const stored = JSON.parse(localStorage.getItem("user1") || "[]");

    if (stored.state.user.password !== password) {
      alert("Old password is wrong");
      return;
    }

    const updateUser = {
      ...stored.state.user,
      password: newpassword,
    };

    const updatedStore = {
      ...stored,
      state: {
        ...stored.state,
        user: updateUser,
      },
    };

    localStorage.setItem("user1", JSON.stringify(updatedStore));
    setUser(updateUser);
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Required Field"),
    newpassword: Yup.string()
      .min(6, "must be atleast 6 characters")
      .matches(/[@#.]/, "must contain @ or # or .")
      .matches(/[0-9]/, "must contain atleast one number")
      .matches(/[a-z]/, "must contain atleast one alphabet")
      .required("Required Field"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("newpassword")], "must be same as new password")
      .required("Required Field"),
  });

  return (
    <div className="flex justify-center items-center p-30">
      <Formik<ChangePassValues>
        initialValues={{
          password: "",
          newpassword: "",
          cpassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleChange}
      >
        <Form className="flex flex-col justify-center bg-neutral-50  gap-2 rounded w-64 p-4 border border-gray-400">
          <label>Old Password</label>
          <Field
            type="password"
            name="password"
            className="border p-1 rounded"
          ></Field>
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 font-light"
          ></ErrorMessage>

          <label>New Password</label>
          <Field
            type="password"
            name="newpassword"
            className="border p-1 rounded"
          ></Field>
          <ErrorMessage
            name="newpassword"
            component="div"
            className="text-red-500 font-light"
          ></ErrorMessage>

          <label>Confirm Password</label>
          <Field
            type="password"
            name="cpassword"
            className="border p-1 rounded"
          ></Field>
          <ErrorMessage
            name="cpassword"
            component="div"
            className="text-red-500 font-light"
          ></ErrorMessage>

          <button
            type="submit"
            className="bg-stone-50 rounded cursor-pointer text-gray-600 font-bold p-4 hover:bg-stone-100"
          >
            Change
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default ChangePass;
