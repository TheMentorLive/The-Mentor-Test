import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
 // Assuming you have this SVG component

export default function UserDashboard1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar (Drawer) */}
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
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', backgroundColor: isMobile ? 'white' : 'transparent' }}>
          <img src="./logo.webp" alt="Logo" style={{ width: 100, height: 40 }} />
        </div>
        <List>
          <ListItem
            button
            sx={{
              backgroundColor: '#2463EB',
              borderRadius: '10px',
             width: '210px',
             marginLeft: '10px'
              
            }}
          >
            <ListItemIcon>
              <LayoutGridIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

// Custom SVG Icon for Layout Grid
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