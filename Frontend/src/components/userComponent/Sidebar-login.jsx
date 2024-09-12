import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton, AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Settings, MenuBook, Assignment, BarChart, Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import { mainContext } from '../../context/mainContex';
import SpaceDashboardTwoToneIcon from '@mui/icons-material/SpaceDashboardTwoTone';
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';

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
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, [user]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleLogout = () => {
    signOut();
    navigate("/");
    // Optionally redirect to login page or other page
  };

  const handleLinkClick = (path) => {
    navigate(path);
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar on mobile when a link is clicked
    }
  };

  const isActive = (path) => location.pathname === path ? { backgroundColor: '#0c8bfa' } : {}; // Highlight active link

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isSidebarOpen}
        onClose={handleToggleSidebar}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: isMobile ? 'white' : 'transparent', // Set background color based on screen size
          },
          zIndex: theme.zIndex.drawer + 1, // Higher zIndex to ensure it's above the AppBar
        }}
      >
        <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', backgroundColor: isMobile ? 'white' : 'transparent' }}>
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="./logo.webp" alt="Logo" style={{ width: 100, height: 40 }} /> {/* Adjust logo size */}
          </Link>
        </div>
        <List>
          {[
              { text: 'Dashboard', icon: <SpaceDashboardTwoToneIcon />, link: '/user-dashboard' },
              { text: 'Courses', icon: <RocketLaunchTwoToneIcon />, link: '/courses' },
              { text: 'Mock-test', icon: <ContentPasteTwoToneIcon />, link: '/subjects' },
              { text: 'Mentors', icon: <BarChart />, link: '/mentors' },
              { text: 'Profile', icon: <Person />, link: "/profile" },
              // { text: 'Job-Portal', icon: <EventNoteTwoToneIcon />, link: '/job-portal' },
              // { text: 'Calendar', icon: < CalendarMonthTwoToneIcon />, link: "/calendar" },
              { text: 'Reports', icon: <BarChart />, link: '#' },
              // { text: 'Community', icon: <ForumTwoToneIcon />, link: "/community" },
          ].map((item, index) => (
            <ListItem 
              button 
              key={index}
              onClick={() => handleLinkClick(item.link)}
              sx={isActive(item.link)} // Apply active link style
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        {/* Move Settings icon above Logout */}
        <div style={{ marginTop: 'auto' }}>
          <Tooltip title="Settings" placement="right">
            <ListItem button component={Link} to="/settings">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Logout" placement="right">
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Tooltip>
        </div>
      </Drawer>

      {/* Main Content */}
      <div style={{ flex: 1, position: 'relative' }}>
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer - 1, backgroundColor: '#1963d1' }}>
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleToggleSidebar}
                sx={{ mr: 2 }}
              >
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
            <div style={{ flexGrow: 1 }} />
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <NotificationsIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
            <Link to="/profile">
              <Tooltip title="Profile">
                <IconButton color="inherit">
                  <AccountCircle sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </Link>
            
            {/* Display Hello, user.name */}
            <span style={{ color: 'white', fontWeight: 'bold', marginLeft: '10px' }}>
              Hello, {name?.name}
            </span>
          </Toolbar>
        </AppBar>

        <main style={{ paddingTop: '64px' }}> {/* Adjust padding-top based on AppBar height */}
          {/* Your main content here */}
        </main>
      </div>
    </div>
  );
}
