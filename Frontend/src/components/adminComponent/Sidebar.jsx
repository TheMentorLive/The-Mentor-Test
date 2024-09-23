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
import AccountCircle from '@mui/icons-material/AccountCircle';
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
  const [testMenuOpen, setTestMenuOpen] = useState(false);

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
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        className="absolute left-4 z-10 md:hidden"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        PaperProps={{
          sx: {
            width: 256,
          },
        }}
      >
        <div className="bg-[#2563EB] text-gray-100 h-full py-8 px-4">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-4 mb-6">
          <AccountCircle sx={{ color: 'white', fontSize: 70 }} />
            {/* <Avatar
              src="/placeholder-user.jpg"
              alt="User Avatar"
              sx={{ width: 64, height: 64 }}
            /> */}
            <div className="text-center">
              <h3 className="text-lg font-semibold">{user.firstName}</h3>
              <p className="text-sm">{user.role}</p>
            </div>
          </div>

          <List>
            <ListItem
              button
              onClick={() => handleLinkClick("/admin")}
              className="hover:bg-gray-700 rounded-md transition-all"
            >
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={toggleTestMenu} className="hover:bg-gray-700 rounded-md transition-all">
              <ListItemIcon><FilesIcon /></ListItemIcon>
              <ListItemText primary="Test" />
              {testMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={testMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleLinkClick("/admin/test/add-subject")} sx={{ pl: 4 }} className="hover:bg-gray-700">
                  <ListItemText primary="Subject" />
                </ListItem>
                <ListItem button onClick={() => handleLinkClick("/admin/test/add-test")} sx={{ pl: 4 }} className="hover:bg-gray-700">
                  <ListItemText primary="Test" />
                </ListItem>
                <ListItem button onClick={() => handleLinkClick("/admin/test/main-test")} sx={{ pl: 4 }} className="hover:bg-gray-700">
                  <ListItemText primary="Main-Test" />
                </ListItem>
                <ListItem button onClick={() => handleLinkClick("/admin/test/mock-test")} sx={{ pl: 4 }} className="hover:bg-gray-700">
                  <ListItemText primary="Mock-Test" />
                </ListItem>
                <ListItem button onClick={() => handleLinkClick("/admin/questions")} sx={{ pl: 4 }} className="hover:bg-gray-700">
                  <ListItemText primary="CSV Bulk Data" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => handleLinkClick("/admin/settings")} className="hover:bg-gray-700 rounded-md transition-all">
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <ListItem button onClick={() => handleLinkClick("/admin/users")} className="hover:bg-gray-700 rounded-md transition-all">
              <ListItemIcon><UsersIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>

            <ListItem button onClick={handleSignOut} className="hover:bg-gray-700 rounded-md transition-all">
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
