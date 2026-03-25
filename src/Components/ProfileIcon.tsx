import { useState, useRef, useEffect } from "react";
import AuthStore from "../store/AuthStore.js";
import { Link, useNavigate } from "react-router";
function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const clearUser = AuthStore((state) => state.clearUser);
  const navigate = useNavigate();
  const dropdownref = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    clearUser();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownref.current && !dropdownref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <div className="relative" ref={dropdownref}>
      <img
        src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="flex flex-col absolute lg:top-12 right-0 mt-2 w-40 bg-white top-14 md:top-13 rounded-b  border-gray-300 shadow z-50">
          <Link
            to="profile"
            className="px-8 py-2 hover:bg-gray-300  border-neutral-300 border-b font-semibold"
            onClick={() => setOpen(false)}
          >
            View Profile
          </Link>
          <button
            onClick={handleLogout}
            className="px-9 py-2 hover:bg-gray-300 text-red-700 font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
export default ProfileIcon;
