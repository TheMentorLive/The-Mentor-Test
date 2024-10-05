import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconNotes,
  IconBook,
  IconUserBolt,
  IconReport,
} from "@tabler/icons-react";
import { ExitToAppTwoTone } from '@mui/icons-material';
import { Sidebar as UISidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar"; // Adjust to your structure
import { UserIcon } from 'lucide-react'; 
import { mainContext } from "../../context/mainContex"; // Adjust path to your context
import { cn } from "./lib/utils"; // Adjust to your utility functions path
 // Adjust logo path as per your project structure

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { signOut } = useContext(mainContext);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const name = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const links = [
    {
      label: "Dashboard",
      icon: (
        <IconLayoutDashboard
          className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Dashboard" ? "text-neutral-200" : "text-neutral-700")}
        />
      ),
      onClick: () => {
        setSelectedComponent("Dashboard");
        navigate("/user-dashboard");
      },
    },
    {
      label: "Courses",
      icon: (
        <IconNotes
          className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Courses" ? "text-neutral-200" : "text-neutral-700")}
        />
      ),
      onClick: () => {
        setSelectedComponent("Courses");
        navigate("/courses");
      },
    },
    {
      label: "Mock-test",
      icon: (
        <IconBook
          className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Mock-test" ? "text-neutral-200" : "text-neutral-700")}
        />
      ),
      onClick: () => {
        setSelectedComponent("Mock-test");
        navigate("/subjects");
      },
    },
    {
      label: "Mentors",
      icon: (
        <IconUserBolt
          className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Mentors" ? "text-neutral-200" : "text-neutral-700")}
        />
      ),
      onClick: () => {
        setSelectedComponent("Mentors");
        navigate("/mentors");
      },
    },
    {
      label: "Reports",
      icon: (
        <IconReport
          className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Reports" ? "text-neutral-200" : "text-neutral-700")}
        />
      ),
      onClick: () => {
        setSelectedComponent("Reports");
        navigate("/reports");
      },
    },
    {
      label: "Logout",
      icon: (
        <ExitToAppTwoTone className="h-7 w-7 flex-shrink-0 text-red-500 mt-[300px]" />
      ),
      onClick: handleLogout,
    },
  ];

  // Render the selected component based on the selected state
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return <div>Dashboard Content</div>; // Replace with actual dashboard component
      case "Courses":
        return <div>Courses Content</div>; // Replace with actual courses component
      case "Mock-test":
        return <div>Mock-test Content</div>; // Replace with actual mock-test component
      case "Mentors":
        return <div>Mentors Content</div>; // Replace with actual mentors component
      case "Reports":
        return <div>Reports Content</div>; // Replace with actual reports component
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#2563EB]">
        <div className="flex items-center">
          <Link to="/">
            <img src="/logo.webp" alt="Logo" style={{ width: 100, height: 40 }} />
          </Link>
        </div>

        <div className="flex items-center">
          <UserIcon className="text-white w-6 h-6 cursor-pointer" />
          <span className="text-white font-bold ml-2">Hello, {name?.name}</span>
        </div>
      </div>

      {/* Sidebar and Content */}
      <div className="flex flex-col md:flex-row bg-white w-full flex-1 mx-auto dark:border-neutral-700">
        <UISidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between min-h-lvh gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto">
              {links.map((link, index) => (
                <SidebarLink
                  key={index}
                  link={{ label: link.label, icon: link.icon }}
                  onClick={link.onClick}
                />
              ))}
            </div>
          </SidebarBody>
        </UISidebar>

        {/* Main Content Area */}
        <main className="flex-1 bg-slate-50 py-4 px-10 overflow-auto h-full">
          <div className="py-6 max-w-7xl mx-auto w-full flex-1">
            {/* Dynamically render the selected component */}
            <div>{renderComponent()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
