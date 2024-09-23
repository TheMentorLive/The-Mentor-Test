import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Typography, Avatar, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Logout as LogOutIcon, Notifications as NotificationsIcon } from "@mui/icons-material";
import AccountCircle from '@mui/icons-material/AccountCircle';

import Sidebar from "./Sidebar";

const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-[#2563EB] text-white border-b flex items-center justify-between px-4 py-3 h-16 md:px-6 md:py-4 shadow-lg">
      <div className="flex items-center">
        <Sidebar />
        <Link to="/">
          <img src="./logo1.png" alt="Logo" className="ml-7" style={{ width: 100, height: 40 }} />
        </Link>
      </div>

      <Typography variant="h5" component="h1" className="text-xl font-bold text-white md:text-2xl">
        Admin Portal
      </Typography>

      <div className="flex items-center gap-2 md:gap-4">
        <IconButton color="inherit">
          <NotificationsIcon sx={{ color: 'white', fontSize: 20 }} />
        </IconButton>
        <IconButton onClick={handleMenuOpen} color="inherit">
          <AccountCircle sx={{ color: 'white', fontSize: 34 }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            style: {
              maxWidth: '200px',
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/admin/my-account" className="text-decoration-none text-gray-800 flex items-center">
              <AccountCircle fontSize="small" sx={{ marginRight: 1 }} /> My Account
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/admin/settings" className="text-decoration-none text-gray-800 flex items-center">
              <AccountCircle fontSize="small" sx={{ marginRight: 1 }} /> Settings
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <LogOutIcon fontSize="small" sx={{ marginRight: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default AdminHeader;
