import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel, Paper, Grid } from '@mui/material';
import { toast } from 'react-toastify'; // For success/error messages

const AdminSettingsPage = () => {
  // Demo settings data
  const [settings, setSettings] = useState({
    siteTitle: 'My Awesome Site',
    allowRegistrations: true,
    maxLoginAttempts: 3,
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving the data and showing a success message
    toast.success('Settings updated successfully!');
    console.log('Saved settings:', settings); // For demo, log the data
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Settings
      </Typography>

      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Site Title */}
            <Grid item xs={12}>
              <TextField
                label="Site Title"
                name="siteTitle"
                fullWidth
                value={settings.siteTitle}
                onChange={handleChange}
              />
            </Grid>

            {/* Allow Registrations */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.allowRegistrations}
                    onChange={handleChange}
                    name="allowRegistrations"
                  />
                }
                label="Allow User Registrations"
              />
            </Grid>

            {/* Max Login Attempts */}
            <Grid item xs={12}>
              <TextField
                label="Max Login Attempts"
                name="maxLoginAttempts"
                type="number"
                fullWidth
                value={settings.maxLoginAttempts}
                onChange={handleChange}
              />
            </Grid>

            {/* Maintenance Mode */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    name="maintenanceMode"
                  />
                }
                label="Maintenance Mode"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminSettingsPage;
