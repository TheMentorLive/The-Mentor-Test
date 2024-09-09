import React from 'react';
import { FormControlLabel, Switch, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom';


// Utility classes using Tailwind CSS
const containerStyle = "flex min-h-screen bg-[#f5f5f5] p-8";
const formContainerStyle = "w-full max-w-[800px] mx-auto bg-white p-8 sm:p-12 space-y-6 rounded-lg shadow-lg";
const sectionTitleStyle = "text-xl font-bold";
const descriptionStyle = "text-muted-foreground";

const Settings = () => {
  const [smsNotifications, setSmsNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [dataSharing, setDataSharing] = React.useState("enabled");

  const handleSmsChange = (event) => setSmsNotifications(event.target.checked);
  const handleEmailChange = (event) => setEmailNotifications(event.target.checked);
  const handleDataSharingChange = (event, newAlignment) => setDataSharing(newAlignment);

  return (
    <div className={containerStyle}>
      <div className={formContainerStyle}>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className={descriptionStyle}>Manage your notification and data sharing settings.</p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className={sectionTitleStyle}>Notifications</h2>
              <FormControlLabel
                control={
                  <Switch
                    checked={smsNotifications}
                    onChange={handleSmsChange}
                    color="primary"
                  />
                }
                label="SMS Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={handleEmailChange}
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
            </div>
            <div className="space-y-4">
              <h2 className={sectionTitleStyle}>Data Sharing</h2>
              <div className="flex items-center justify-between">
                <p className={descriptionStyle}>Manage your data sharing settings</p>
                <ToggleButtonGroup
                  value={dataSharing}
                  exclusive
                  onChange={handleDataSharingChange}
                  aria-label="data sharing"
                >
                  <ToggleButton value="enabled" className="bg-[#2563EB] text-white hover:bg-blue-600">
                    Enable
                  </ToggleButton>
                  <ToggleButton value="disabled" className="bg-gray-500 text-white hover:bg-gray-600">
                    Disable
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 ">
          <Button
           variant="outlined"
         
           
           className="px-4 py-2"
         >
              Cancel
              </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="px-4 py-2"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
