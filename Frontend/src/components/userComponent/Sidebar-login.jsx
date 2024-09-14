import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton, AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Groups } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { mainContext } from '../../context/mainContex';
import { Settings as SettingsIcon, BarChart, ExitToAppTwoTone } from '@mui/icons-material';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, signOut } = useContext(mainContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is mobile or tablet
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const name = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
  }, [user]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
    // Optionally redirect to login page or other page
  };

  const handleLinkClick = path => {
    navigate(path);
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar on mobile when a link is clicked
    }
  };

  const isActive = path =>
    location.pathname === path
      ? 'bg-blue-600 rounded-lg w-[210px] ml-2 text-white'
      : '';

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={isSidebarOpen}
        onClose={handleToggleSidebar}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: isMobile ? 'white' : 'transparent',
          },
          zIndex: theme.zIndex.drawer + 1, // Higher zIndex to ensure it's above the AppBar
        }}
      >
        <div className="h-[60px] flex items-center px-4 bg-transparent">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="./logo.webp" alt="Logo" className="w-[100px] h-[40px]" />
          </Link>
        </div>
        <List>
          {[
            { text: 'Dashboard', icon: <LayoutGridIcon />, link: '/user-dashboard' },
            { text: 'Courses', icon: <BookIcon />, link: '/courses' },
            { text: 'Mock-test', icon: <FileTextIcon />, link: '/subjects' },
            { text: 'Mentors', icon: <Groups />, link: '/mentors' },
            { text: 'Reports', icon: <BarChart />, link: '/reports' },
          ].map((item, index) => (
            <ListItem button key={index} onClick={() => handleLinkClick(item.link)} className={`hover:bg-gray-200 ${isActive(item.link)}`}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        {/* Move Settings icon above Logout */}
        <div className="mt-auto">
          <Tooltip title="Settings" placement="right">
            <ListItem button component={Link} to="/settings">
              <SettingsIcon />
              <ListItemText className="ml-4" primary="Settings" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Logout" placement="right">
            <ListItem button onClick={handleLogout}>
              <ExitToAppTwoTone />
              <ListItemText className="ml-4" primary="Logout" />
            </ListItem>
          </Tooltip>
        </div>
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 relative">
        <AppBar position="fixed" className="z-[theme.zIndex.drawer - 1] bg-blue-600">
          <Toolbar>
            {isMobile && (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleSidebar} className="mr-2">
                <MenuIcon className="text-white" />
              </IconButton>
            )}
            <div className="flex-grow" />
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <NotificationsIcon className="text-white" />
              </IconButton>
            </Tooltip>
            <Link to="/profile">
              <Tooltip title="Profile">
                <IconButton color="inherit">
                  <AccountCircle className="text-white" />
                </IconButton>
              </Tooltip>
            </Link>
            {/* Display Hello, user.name */}
            <span className="text-white font-bold ml-2">Hello, {name?.name}</span>
          </Toolbar>
        </AppBar>

        <main className="pt-16">{/* Your main content here */}</main>
      </div>
    </div>
  );
}

function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}
