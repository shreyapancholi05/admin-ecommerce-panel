import { Link } from "react-router";
function SideComponents() {
  return (
    <div className="flex flex-col justify-center  text-lg text-black tracking-wider pt-5 px-3">
      
      <Link to="/dashboard" className=" border-gray-300/70 border-b pb-2 ">
        Dashboard
      </Link>
      <Link to="/products" className="border-gray-300/70 border-b py-3">
        Products
      </Link>
      <Link to="/users" className="border-gray-300/70 border-b py-3">
        Users
      </Link>
      <Link to="/changepassword" className="py-3">
        Change Password
      </Link>
      
      
    </div>
  );
}

export default SideComponents;
