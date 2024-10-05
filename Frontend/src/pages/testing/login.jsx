import React, { useState, useContext, useEffect } from "react";
import { Sidebar as UISidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar"; // Renamed imported Sidebar to UISidebar
import { Settings as SettingsIcon, BarChart, ExitToAppTwoTone } from '@mui/icons-material';
import { UserIcon } from 'lucide-react'; 
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconSettings,
  IconReport,
  IconUserBolt,
  IconNotes,
  IconBook,
} from "@tabler/icons-react";
import { cn } from "../../../public/lib/utils";
import NotFound from "../PageNotFound";
import UserDashboard from "../user/Userdashboard";
import { mainContext } from "../../context/mainContex";
import SubjectComponent from "../user/Subject";
import Course from "../user/courses/courses";

export default function Sidebar() {  // Keeping your custom component as 'Sidebar'
  const [open, setOpen] = useState(false);
  const { signOut } = useContext(mainContext);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const name = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        navigate("/user-dashboard");
        break;
      case "Courses":
        navigate("/courses");
        break;
      case "Mock-test":
        navigate("/subjects");
        break;
      case "Mentors":
      case "Reports":
      default:
        navigate("/subjects");
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconLayoutDashboard className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Dashboard" ? "text-neutral-200" : "text-neutral-700 dark:text-black")} />
      ),
      onClick: () => setSelectedComponent("Dashboard"),
    },
    {
      label: "Courses",
      href: "#",
      icon: (
        <IconNotes className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Courses" ? "text-neutral-200" : "text-neutral-700 dark:text-black")} />
      ),
      onClick: () => setSelectedComponent("Courses"),
    },
    {
      label: "Mock-test",
      href: "#",
      icon: (
        <IconBook className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Mock-test" ? "text-neutral-200" : "text-neutral-700 dark:text-black")} />
      ),
      onClick: () => setSelectedComponent("Mock-test"),
    },
    {
      label: "Mentors",
      href: "#",
      icon: (
        <IconUserBolt className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Mentors" ? "text-neutral-200" : "text-neutral-700 dark:text-black")} />
      ),
      onClick: () => setSelectedComponent("Mentors"),
    },
    {
      label: "Reports",
      href: "#",
      icon: (
        <IconReport className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Reports" ? "text-neutral-200" : "text-neutral-700 dark:text-black")} />
      ),
      onClick: () => setSelectedComponent("Reports"),
    },
    {
      href: "#",
      icon: (
        <ExitToAppTwoTone className={cn("h-7 w-7 flex-shrink-0 text-red-500 mt-[300px]")} />
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 bg-[#2563EB]">
        <div className="flex items-center">
          <Link to="/">
            <img src="./logo.webp" alt="Logo" style={{ width: 100, height: 40, marginLeft: '60px' }} />
          </Link>
        </div>

        <div className="flex items-center">
          <UserIcon className="text-white w-6 h-6 cursor-pointer" />
          <span style={{ color: 'white', fontWeight: 'bold', marginLeft: '10px' }}>Hello, {name?.name}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-white w-full flex-1 mx-auto dark:border-neutral-700">
        <UISidebar open={open} setOpen={setOpen}> {/* Use the renamed UISidebar for the imported one */}
          <SidebarBody className="justify-between min-h-lvh gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-9"></div>
              {links.map((link, index) => (
                <SidebarLink
                  key={index}
                  link={{
                    label: link.label,
                    href: link.href,
                    icon: link.icon,
                  }}
                  onClick={link.onClick}
                />
              ))}
            </div>
          </SidebarBody>
        </UISidebar>

        <main className="flex-1 bg-slate-50 py-4 px-10 overflow-auto h-full">
          <div className="py-6 max-w-7xl mx-auto w-full flex-1">
            <div>{renderComponent()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
