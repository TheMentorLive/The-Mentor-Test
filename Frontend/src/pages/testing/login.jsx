import React, { useState, useContext } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import { Settings as SettingsIcon, BarChart, ExitToAppTwoTone } from '@mui/icons-material';
import { UserIcon } from 'lucide-react'; // Importing icon from lucide-react
import { Navigate } from "react-router-dom";
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

// Import the new pages/components
import SubjectComponent from "../user/Subject";
import Course from "../user/courses/courses";

export default function Userdash() {
  const [open, setOpen] = useState(false);
  const { signOut } = useContext(mainContext); // Ensure mainContext provides signOut
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const name = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  
  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
  }, [user]);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        navigate("/user-dashboard");
      case "Courses":
        navigate("/courses"); // Show Courses List page
      case "Mock-test":
        navigate("/subjects"); // Show Add Course page
      case "Mentors":
      case "Reports":
      default:
        navigate("/subjects"); // Handle other cases
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
      onClick: () => setSelectedComponent("Courses"), // Added onClick handler
    },
    {
      label: "Mock-test",
      href: "#",
      icon: (
        <IconBook className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Mock-test" ? "text-neutral-200" : "text-neutral-700 dark:text-black")} />
      ),
      onClick: () => setSelectedComponent("Mock-test"), // Added onClick handler
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
      {/* Logo on the left */}
      <div className="flex items-center">
        
      <Link to="/">
              <img src="./logo.webp" alt="Logo" style={{ width: 100, height: 40, marginLeft: '60px' }} />
            </Link>
            
      </div>

      {/* Profile icon on the right */}
      <div className="flex items-center">
        <UserIcon className="text-white w-6 h-6 cursor-pointer" />
        <span style={{ color: 'white', fontWeight: 'bold', marginLeft: '10px' }}>Hello, {name?.name}</span>
      </div>
    </div>
      <div className="flex flex-col md:flex-row bg-white w-full flex-1 mx-auto dark:border-neutral-700  ">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between min-h-lvh gap-10 ">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-9">
                
              </div>
              {/* Render the sidebar links */}
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
        </Sidebar>

        <main className="flex-1 bg-slate-50 py-4 px-10 overflow-auto h-full">
          <div className="py-6 max-w-7xl mx-auto w-full flex-1">
            <div>{renderComponent()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
