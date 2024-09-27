import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton, AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Groups } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Settings as SettingsIcon, BarChart, ExitToAppTwoTone } from '@mui/icons-material';

export default function Sidebar1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const name = { name: 'User' }; // Mock user data

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleLinkClick = path => {
    // Logic for navigating
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const isActive = path => {
    const isReports = path === '/reports'; // Check if the current path is for Reports
    return {
      backgroundColor: isReports ? 'transparent' : '#2463EB', // Active background color
      borderRadius: '10px',
      width:'200px',
      color: isReports ? '#ccc' : '#fff', // Inactive text color for Reports
      margin: '10px',
      
      padding: '10px',
      fontWeight: isReports ? 'normal' : 'bold', // Normal weight for inactive
      '&:hover': {
        backgroundColor: isReports ? 'transparent' : '#2463EB', // Keep background consistent
      },
    };
  };

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
          marginTop: '64px', // Margin to prevent overlap with navbar
          [`& .MuiDrawer-paper`]: {
            width: 220,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            marginTop: '64px',
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
            { text: 'Reports', icon: <BarChart />, link: '/reports' }, // Keeping Reports in the list
          ].map((item, index) => (
            <div key={index}>
              <ListItem 
                button 
                onClick={() => handleLinkClick(item.link)} 
                sx={isActive(item.link)}
              >
                <ListItemIcon sx={{ color: item.link === window.location.pathname ? '#fff' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
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
            <ListItem button>
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
            <span style={{ color: 'white', fontWeight: 'bold', marginLeft: '10px' }}>Hello, {name.name}</span>
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
