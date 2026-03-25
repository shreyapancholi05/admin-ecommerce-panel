import { useRoutes } from "react-router";
import Login from "./login.js";
import SignUp from "./signup.js";
import Profile from "./Pages/profile.js";
import DashBoardLayout from "./Pages/dashboardlayout.js";
import Home from "./Pages/Home.js";
import ProtectedRoutes from "./ProtectedRoutes.js";
import ChangePass from "./Pages/ChangePass.js";
import Users from "./Pages/Users/Users.js";
import UserDetails from "./Pages/Users/UserDetails.js";
import PublicRoutes from "./Pages/PublicRoutes";
import { ProdLayout } from "./Pages/Products/ProdLayout.js";
import { ProductDetails } from "./Pages/Products/ProductDetails.js";
import AddProduct from "./Pages/Products/AddProduct.js";
function Routes() {
  const element = useRoutes([
    {
      element: <PublicRoutes />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },

      ]
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          element: <DashBoardLayout />,
          children: [
            { path: "/dashboard", element: <Home /> },
            { path: "/profile", element: <Profile /> },
            { path: "/changepassword" , element: <ChangePass/>},
            { path: "/users", element: <Users/>},
            { path: "/users/:id", element: <UserDetails/>},
            { path: "/products", element: <ProdLayout/>},
            
            
            { path: "/products/:id", element: <ProductDetails/>},
            { path: "/products/addproduct", element: <AddProduct/>},
            { path: "/products/edit/:id", element: <AddProduct/>}
          ],
        },
      ],
    },
  ]);
  return element;
}

export default Routes;

