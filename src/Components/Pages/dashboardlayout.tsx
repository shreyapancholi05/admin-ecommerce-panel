import { Outlet } from "react-router";
import ProfileIcon from "../ProfileIcon.js";
import SideComponents from "./SideComponents.js";
import { useEffect, useState } from "react";
import api from "../../api/Dummyapi.js";
import { Menu, X} from "lucide-react";

function DashBoardLayout() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/auth/me");
        console.log("Logged in user data", res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      
      <header className="sticky top-0 z-50 border-b border-gray-400/70 lg:px-3 lg:py-2 md:p-3 p-4">
        <div className="flex justify-between items-center lg:px-5 ">
          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(!open)} className="md:hidden pt-2 ">
              <Menu size={28}></Menu>
            </button>
            <h1
              className="text-4xl font-bold  tracking-wider text-stone-90">
              SITE
            </h1>
          </div>
          <ProfileIcon></ProfileIcon>
        </div>
      </header>
    
      <div className="flex flex-1 bg-neutral-100 overflow-hidden">
        {open && (
          <div onClick={() => setOpen(false)}
          className="fixed inset-0 lg:hidden z-30"></div>
        )}
        <aside className={`fixed lg:sticky h-screen  top-0 left-0   w-64 border-r px-2 border-gray-400/70 bg-white transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}  lg:translate-x-0 z-50`}>
        <div className="flex justify-end p-2">
          <button className="text-gray-400 md:hidden"
          onClick={() => setOpen(false)}>
            <X size={20}/>
          </button>
        </div>
          <SideComponents></SideComponents>
        </aside>
        <main className="flex-1 overflow-y-auto" >
          <Outlet></Outlet>
        </main>
      </div>
    </div>
    
  );
}

export default DashBoardLayout;
