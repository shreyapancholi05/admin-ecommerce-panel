import AuthStore from "../../store/AuthStore.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { User } from "../../Types/user.js";

interface ProfileValues {
  fname: string;
  lname: string;
  email: string;
  dob: string;
  address: string;
}
function Profile() {
  const user = AuthStore((state) => state.userData);
  const setUser = AuthStore((state) => state.setUser);

  if (!user) {
    console.log("no user detected");
    return;
  }

  const handleUpdate = (values: ProfileValues) => {
    // const stored = JSON.parse(localStorage.getItem("user1"));
    // stored.state.user = newData;
    // localStorage.setItem("users", JSON.stringify(stored.state.user));
    // console.log(stored);
    const updatedUser: User = {
      ...user,
      ...values,
    };
    try {
      setUser(updatedUser);
      alert("Details Updated Successfully");
    } catch (error) {
      console.log(error);

      alert("An error occurred");
    }
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required("Required Field"),
    lname: Yup.string().required("Required Field"),
    dob: Yup.date().required("Required Field"),
    address: Yup.string().required("Required Field"),
  });
  return (
    <div className="flex justify-center items-center p-30">
      <Formik<ProfileValues>
        initialValues={{
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          dob: user.dob,
          address: user.address,
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleUpdate}
      >
        <Form className="flex flex-col justify-center bg-neutral-50 gap-2 rounded-xl p-4 border border-gray-400 ">
          <h1 className="font-bold text-center text-3xl p-3">Profile</h1>
          <div className="flex gap-3">
            <div className="flex flex-col">
              <label>First Name</label>
              <Field
                name="fname"
                type="text"
                className="border p-1 rounded"
              ></Field>
              <ErrorMessage
                name="fname"
                component="div"
                className="text-red-500 font-light"
              ></ErrorMessage>
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <Field
                type="text"
                name="lname"
                className="border p-1 rounded"
              ></Field>
              <ErrorMessage
                name="lname"
                component="div"
                className="text-red-500 font-light"
              ></ErrorMessage>
            </div>
          </div>

          <label>Email</label>
          <Field
            type="email"
            name="email"
            disabled
            className="border p-1 rounded border-gray-300 text-gray-500"
          ></Field>

          <label>Date of Birth</label>
          <Field type="date" name="dob" className="border p-1 rounded"></Field>
          <ErrorMessage
            name="dob"
            component="div"
            className="text-red-500 font-light"
          ></ErrorMessage>

          <label>Address</label>
          <Field
            type="text"
            name="address"
            className="border p-1 rounded"
          ></Field>
          <ErrorMessage
            name="address"
            component="div"
            className="text-red-500 font-light"
          ></ErrorMessage>

          <button
            type="submit"
            className="bg-stone-50 rounded cursor-pointer text-gray-600 font-bold p-4 hover:bg-stone-100"
          >
            Update
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Profile;
