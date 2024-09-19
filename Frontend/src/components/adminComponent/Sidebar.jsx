import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
  Description as FilesIcon,
  Logout as LogOutIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { mainContext } from "../../context/mainContex";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useContext(mainContext);
  const [open, setOpen] = useState(false);
  const [testMenuOpen, setTestMenuOpen] = useState(false); // State for the Test dropdown menu

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    if (open) {
      toggleSidebar();
    }
  };

  const toggleTestMenu = () => {
    setTestMenuOpen(!testMenuOpen);
  };

  return (
    <>
      {/* Menu Button to Open Sidebar */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        className="absolute top-4 left-4 z-10 md:hidden"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar (Drawer) */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        PaperProps={{
          sx: {
            width: 256,
            bgcolor: 'background.gray',
            color: 'text.primary'
          }
        }}
      >
        <div className="bg-gradient-r bg-blue-800 to bg-black text-gray-100 h-full w-64 py-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-6 mb-6">
            <Avatar
              src="/placeholder-user.jpg"
              alt="User Avatar"
              sx={{ width: 64, height: 64 }}
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold">{user.firstName}</h3>
              <p className="text-sm">{user.role}</p>
            </div>
          </div>

          {/* Navigation Section */}
          <List>
            <ListItem button onClick={() => handleLinkClick("/admin")}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={toggleTestMenu}>
              <ListItemIcon><FilesIcon /></ListItemIcon>
              <ListItemText primary="Test" />
              {testMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {/* Submenu for Test */}
            <Collapse in={testMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleLinkClick("/admin/test/add-subject")} sx={{ pl: 4 }}>
                  <ListItemText primary="subject" />
                </ListItem>
                <ListItem button onClick={() => handleLinkClick("/admin/test/add-test")} sx={{ pl: 4 }}>
                  <ListItemText primary="Test" />
                </ListItem>
                <ListItem button onClick={() => handleLinkClick("/admin/test/main-test")} sx={{ pl: 4 }}>
                  <ListItemText primary="Main-Test" />
                </ListItem>
                <ListItem button onClick={() => handleLinkClick("/admin/test/mock-test")} sx={{ pl: 4 }}>
                  <ListItemText primary="Mock-Test" />
                </ListItem>

                <ListItem button onClick={() => handleLinkClick("/admin/questions")} sx={{ pl: 4 }}>
              <ListItemText primary="Csv-bulk-data" />
            </ListItem>
              </List>
            </Collapse>

          
            <ListItem button onClick={() => handleLinkClick("/admin/settings")}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={() => handleLinkClick("/admin/users")}>
              <ListItemIcon><UsersIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon><LogOutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
