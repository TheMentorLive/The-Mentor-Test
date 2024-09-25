import React, { useState, useContext } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import {
  IconArrowLeft,
  IconLayoutDashboard,
  IconSettings,
  IconUserBolt,
  IconNotes,
  IconBook,
  IconFileText,
  IconFileUpload,
} from "@tabler/icons-react";
import { cn } from "../../public/lib/utils"; // Ensure this utility exists
import AdminHeader from "../components/adminComponent/AdminHeader";
import GoogleDocsQuestionComponent from "./admin/Questions";
import AddSubject from "./admin/AddSubject";
import AdminSettingsPage from "./admin/Settings";
import AddQuestionPage from "./admin/test/AddQuestions";
import MainTestPage from "./admin/test/MainTest";
import MockTestPage from "./admin/test/MockTest";
import Users from "./list/UserList";
import AdminLanding from "./admin/Admin-landing"; // Adjust import path as necessary
import { mainContext } from "../context/mainContex"; // Ensure this is correctly spelled and provided

export default function UserDashboard1() {
  const [open, setOpen] = useState(false);
  const { signOut } = useContext(mainContext); // Ensure mainContext provides signOut
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const handleSignOut = () => {
    signOut(); // Ensure this function is correctly defined in the context
    window.location.href = "/"; // Redirect to the home page
  };

  const toggleTestDropdown = () => {
    setShowTestDropdown((prev) => !prev);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "dashboard":
        return <AdminLanding />;
      case "Subject":
        return <AddSubject />;
      case "Test":
        return <AddQuestionPage />;
      case "Main-Test":
        return <MainTestPage />;
      case "Mock-Test":
        return <MockTestPage />;
      case "CSV Bulk":
        return <GoogleDocsQuestionComponent />;
      case "Users":
        return <Users />;
      case "Settings":
        return <AdminSettingsPage />;
      default:
        return <AdminLanding />;
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconLayoutDashboard className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "dashboard" ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
      onClick: () => setSelectedComponent("dashboard"),
    },
    {
      label: "Test",
      href: "#",
      icon: <IconNotes className={cn("h-7 w-7 flex-shrink-0", showTestDropdown ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
      isDropdown: true,
    },
    {
      label: "Users",
      href: "#",
      icon: <IconUserBolt className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Users" ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
      onClick: () => setSelectedComponent("Users"),
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Settings" ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
      onClick: () => setSelectedComponent("Settings"),
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />,
      onClick: handleSignOut, // Corrected to call the function
    },
  ];

  return (
    <div>
      <AdminHeader />
      <div className={cn("flex flex-col md:flex-row bg-white w-full flex-1 mx-auto min-h-screen dark:border-neutral-700 overflow-hidden", "h-[60vh]")}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
                <SidebarLink
                  link={{
                    label: "Admin",
                    href: "#",
                    icon: (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXQdR8ASprCthAPu4yHGB8WDcpG5mhQVDCRxXFQ1rOfPI7Iy9n56IfF6GJU9Xrdz1CyrI&usqp=CAU"
                        className="h-7 w-7 flex-shrink-0 rounded-full"
                        alt="Avatar"
                      />
                    ),
                  }}
                />
                {links.map((link, idx) => (
                  <div key={idx}>
                    <div onClick={link.isDropdown ? toggleTestDropdown : link.onClick}>
                      <SidebarLink link={link} />
                    </div>
                    {link.isDropdown && showTestDropdown && (
                      <div className="ml-5 flex flex-col">
                        <SidebarLink
                          link={{
                            label: "Subject",
                            href: "#",
                            icon: <IconBook className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Subject" ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
                          }}
                          onClick={() => setSelectedComponent("Subject")}
                        />
                        <SidebarLink
                          link={{
                            label: "Test",
                            href: "#",
                            icon: <IconFileText className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Test" ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
                          }}
                          onClick={() => setSelectedComponent("Test")}
                        />
                        <SidebarLink
                          link={{
                            label: "Main-Test",
                            href: "#",
                            icon: <IconFileText className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Main-Test" ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
                          }}
                          onClick={() => setSelectedComponent("Main-Test")}
                        />
                        <SidebarLink
                          link={{
                            label: "Mock-Test",
                            href: "#",
                            icon: <IconFileText className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "Mock-Test" ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
                          }}
                          onClick={() => setSelectedComponent("Mock-Test")}
                        />
                        <SidebarLink
                          link={{
                            label: "CSV Bulk",
                            href: "#",
                            icon: <IconFileUpload className={cn("h-7 w-7 flex-shrink-0", selectedComponent === "CSV Bulk" ? "text-black" : "text-neutral-700 dark:text-neutral-200")} />,
                          }}
                          onClick={() => setSelectedComponent("CSV Bulk")}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        {/* Right section renders the selected component */}
        <div className="p-4">
  {renderComponent()}
</div>
      </div>
    </div>
  );
}
