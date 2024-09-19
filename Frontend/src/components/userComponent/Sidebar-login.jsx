import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton, AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Groups } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { mainContext } from '../context/mainContex';
import { Settings as SettingsIcon, BarChart, ExitToAppTwoTone } from '@mui/icons-material';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, signOut } = useContext(mainContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const navigate = useNavigate();
  const location = useLocation();
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
  };

  const handleLinkClick = path => {
    navigate(path);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const isActive = path =>
    location.pathname === path
      ? {
          backgroundColor: '#2463EB',
          borderRadius: '10px',
          color: '#fff',
          margin: '10px',
          padding: '10px',
          fontWeight: 'bold',
        }
      : {};

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
  variant={isMobile ? 'temporary' : 'permanent'}
  anchor="left"
  open={isSidebarOpen}
  onClose={handleToggleSidebar}
  sx={{
    width: 240,
    flexShrink: 0,
    marginTop: '64px', // Adds margin to prevent overlap with navbar
    [`& .MuiDrawer-paper`]: {
      width: 240,
      boxSizing: 'border-box',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      marginTop: '64px', // Adds margin to the drawer paper to align with the AppBar
      
    },
    zIndex: theme.zIndex.drawer + 1,
  }}
      >
        <List>
          {[
            { text: 'Dashboard', icon: <LayoutGridIcon />, link: '/user-dashboard' },
            { text: 'Courses', icon: <BookIcon />, link: '/courses' },
            { text: 'Mock-test', icon: <FileTextIcon />, link: '/subjects' },
            { text: 'Mentors', icon: <Groups />, link: '/mentors' },
            { text: 'Reports', icon: <BarChart />, link: '/reports' },
          ].map((item, index) => (
            <div key={index} >
              <ListItem button onClick={() => handleLinkClick(item.link)} sx={isActive(item.link)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '1rem',
                    fontWeight: 'medium',
                    letterSpacing: 0,
                  }}
                />
              </ListItem>
            </div>
          ))}
        </List>

        <div style={{ marginTop: 'auto', marginBottom: '70px' }}>
          <Tooltip title="Settings" placement="right">
            <ListItem button component={Link} to="/settings">
              <ListItemIcon>
                <SettingsIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Logout" placement="right">
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppTwoTone sx={{ color: '#e53935' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Tooltip>
        </div>
      </Drawer>

      {/* Main Content */}
      <div style={{ flex: 1, position: 'relative' }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer - 1,
            backgroundColor: '#2463EB',
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleSidebar} sx={{ mr: 2 }}>
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
            <Link to="/">
              <img src="./logo.webp" alt="Logo" style={{ width: 100, height: 40, marginRight: '16px' }} />
            </Link>
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
            <span style={{ color: 'white', fontWeight: 'bold', marginLeft: '10px' }}>Hello, {name?.name}</span>
          </Toolbar>
        </AppBar>

        <main style={{ paddingTop: '64px' }}>{/* Your main content here */}</main>
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
